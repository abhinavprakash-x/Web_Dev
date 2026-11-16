# Spring Core and Spring Boot — Study Notes

> Refactored from the original notes. The same topics and learning progression are retained, with examples reformatted and a few technical details clarified where the original wording could lead to incorrect conclusions.

---

# 1. Circular Dependencies

## 1.1 What is a circular dependency?

A **circular dependency** occurs when two or more classes depend on each other.

For example:

- Class `A` needs an object of class `B`.
- Class `B` also needs an object of class `A`.

```text
A  ───── depends on ─────>  B
^                          |
|                          |
└──────── depends on ──────┘
```

### A circular dependency without Spring

```java
public class A {
    private final B b;

    public A() {
        this.b = new B();
    }
}

public class B {
    private final A a;

    public B() {
        this.a = new A();
    }
}
```

Creating `new A()` causes the following sequence:

```text
new A()
  └── new B()
        └── new A()
              └── new B()
                    └── ...
```

This recursion never finishes and eventually causes a `StackOverflowError`.

## 1.2 Circular dependencies in Spring

Spring's IoC container creates beans and injects their dependencies. It can detect circular references, but not every kind of circular dependency can be resolved.

A **constructor-injection cycle** is the clearest problematic case:

```java
@Component
public class A {
    public A(B b) {
        // ...
    }
}

@Component
public class B {
    public B(A a) {
        // ...
    }
}
```

Spring cannot finish creating `A` without `B`, and cannot finish creating `B` without `A`. This normally results in a bean-creation error such as `BeanCurrentlyInCreationException`.

### How should a circular dependency be handled?

**Preferred solution — refactor the design**

Try to remove the cycle. For example, move shared responsibilities into a third service that both classes can depend on.

**Alternative — `@Lazy` injection**

`@Lazy` on an injection point tells Spring to inject a lazy-resolution proxy. The actual target bean is resolved when the dependency is first used.

```java
@Component
public class A {
    private final B b;

    public A(@Lazy B b) {
        this.b = b;
    }
}

@Component
public class B {
    private final A a;

    public B(A a) {
        this.a = a;
    }
}
```

This can break the immediate creation cycle, but it does not remove the underlying design dependency. Use it only when the cycle is understood and justified.

**Setter or field injection**

Setter/field injection can allow Spring to create singleton beans before completing all their dependencies. Some such circular references can be resolved by Spring, but this is not a general solution and can leave objects temporarily only partially initialized.

> **Spring Boot version note:** Spring Boot 2.6 and later disallow circular bean references by default. The setting `spring.main.allow-circular-references=true` can opt back into circular-reference support in versions that provide it, but redesigning the dependency graph is preferable. Constructor cycles remain unsuitable for ordinary dependency resolution.

**Using `@PostConstruct` to complete a dependency manually**

A callback can be used to set a dependency after bean construction, but this is another form of deferred/setter-based wiring. It can make initialization order harder to understand and should not be treated as a recommended general fix.

---

# 2. Bean Scopes

A **bean scope** defines how many instances of a bean Spring creates and how long those instances are associated with the container or a particular context.

## 2.1 Singleton scope

`singleton` is the default Spring bean scope.

- Spring creates one bean instance per bean definition, per Spring IoC container.
- A non-lazy singleton is normally created eagerly when the application context is initialized.
- The same instance is shared whenever that bean is requested from the same container.

```java
@Component
@Scope("singleton") // Optional: singleton is already the default
public class UserService {
}
```

Important: singleton does **not** mean that the entire application can contain only one object of a particular Java class. It means one instance for each bean definition in a given container.

For example, two `@Bean` methods can each return a different `Student` object:

```java
@Configuration
public class AppConfig {

    @Bean
    public Student studentOne() {
        return new Student();
    }

    @Bean
    public Student studentTwo() {
        return new Student();
    }
}
```

This configuration defines two beans—`studentOne` and `studentTwo`. Each bean has singleton scope by default, but they are two separate `Student` instances.

## 2.2 Prototype scope

With `prototype` scope, Spring creates a new bean instance each time that bean is requested from the container.

```java
@Component
@Scope("prototype")
public class ReportBuilder {
}
```

For example, repeated calls to `getBean(ReportBuilder.class)` return different instances.

Important details:

- Prototype beans are created when requested; they are not eagerly pre-created at context startup.
- Spring performs bean creation and initialization, then hands the instance to the requesting code.
- Spring does **not** manage the complete destruction lifecycle of prototype instances.
- The code that obtains a prototype bean is responsible for releasing resources it owns.

A prototype bean injected directly into a singleton is normally resolved when that singleton is created. It does **not** automatically produce a fresh prototype instance on every method call. Use a provider such as `ObjectProvider<T>` when a new instance is required repeatedly.

## 2.3 Other scopes

Spring also provides scopes intended for web applications:

| Scope | Meaning |
|---|---|
| `request` | One bean instance for an individual HTTP request |
| `session` | One bean instance for an HTTP session |
| `application` | One bean instance for a `ServletContext` |
| `websocket` | One bean instance for a WebSocket session |

The request, session, and application scopes require a web-aware application context.

## 2.4 When should each scope be used?

A useful starting point:

- **Singleton:** Usually suitable for stateless services and shared components.
- **Prototype:** Can be useful when each request for the bean should produce a separate object.
- **Request/session:** Useful when data belongs to a particular HTTP request or user session.

A class is **stateless** when its behavior does not depend on mutable, per-user or per-request instance state. A class is **stateful** when it maintains state in its fields.

Do not automatically choose prototype scope just because a class has fields. A singleton bean can have fields too, but mutable state shared between concurrent requests must be designed carefully. Scope selection should follow the lifetime and ownership of the data.

---

# 3. Eager and Lazy Initialization

Bean scope and bean initialization timing are related, but they describe different things:

- **Scope:** How bean instances are created and shared.
- **Initialization timing:** When Spring creates a bean.

## 3.1 Eager initialization

A non-lazy singleton bean is normally created when the application context starts.

```text
ApplicationContext starts
          |
          v
Spring creates singleton bean
          |
          v
Bean is ready for use
```

## 3.2 Lazy initialization

`@Lazy` tells Spring to postpone creating a bean until it is needed.

It can be applied to a component:

```java
@Component
@Lazy
public class ExpensiveService {
}
```

It can also be applied to a `@Bean` method:

```java
@Configuration
public class AppConfig {

    @Bean
    @Lazy
    public ExpensiveService expensiveService() {
        return new ExpensiveService();
    }
}
```

A lazy singleton is created when it is first requested, rather than during normal context startup. If an eager bean requires that lazy bean during startup, the dependency may still cause it to be created then.

Prototype beans are created on demand when requested. They are not pre-created as a set of singleton beans during application-context startup.

## 3.3 `@Lazy` on an injection point and proxies

`@Lazy` has another useful behavior when it is placed on a dependency injection point.

```java
@Component
public class OrderService {
    private final PaymentService paymentService;

    public OrderService(@Lazy PaymentService paymentService) {
        this.paymentService = paymentService;
        System.out.println("OrderService constructor called");
    }

    public void placeOrder() {
        paymentService.pay();
    }
}
```

Spring can inject a **lazy-resolution proxy** instead of resolving the target dependency immediately.

Conceptually:

1. Spring creates `OrderService`.
2. A proxy for `PaymentService` is supplied to its constructor.
3. `OrderService` can be created without immediately creating the target `PaymentService`.
4. When `paymentService.pay()` is invoked, the proxy resolves the actual bean and delegates the call.

A proxy is an intermediary object; it is not the real target service itself.

### Using `@Lazy` with a circular dependency

A lazy proxy at one injection point can sometimes break an immediate circular creation dependency. For example, one side of an `A`–`B` cycle can receive the other through a lazy proxy.

This is a workaround, not a substitute for a clean dependency design.

---

# 4. Bean Lifecycle

The **bean lifecycle** describes the stages a Spring-managed object goes through, from creation to destruction.

## 4.1 Singleton bean lifecycle

A simplified lifecycle for a singleton bean is:

```text
Bean instantiation
       |
       v
Dependency injection / property population
       |
       v
Aware callbacks
       |
       v
BeanPostProcessor: before initialization
       |
       v
Initialization callbacks
       |
       v
BeanPostProcessor: after initialization
       |
       v
Bean ready for use
       |
       v
Container closes
       |
       v
Destruction callbacks
```

The main stages are:

1. **IoC container starts.**
2. Spring reads configuration metadata, such as `AppConfig`, component-scan declarations, and `@Bean` methods.
3. Spring discovers bean definitions. A bean definition contains metadata about a bean, such as its class, scope, and dependencies.
4. Spring instantiates beans and supplies their dependencies.
5. Spring invokes relevant `Aware` callbacks.
6. Spring runs initialization processing and callbacks.
7. The bean becomes available for use.
8. When the context is closed, Spring invokes supported destruction callbacks for managed singleton beans.

Spring is dependency-aware. For constructor injection, it creates required dependencies before it can finish invoking the dependent bean's constructor.

## 4.2 Example: component scanning and constructor injection

```java
@Configuration
@ComponentScan("com.example")
public class AppConfig {
}
```

```java
@Component
public class PaymentService {

    public void pay() {
        System.out.println("Payment Done");
    }
}
```

```java
@Component
public class OrderService {
    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        System.out.println("Order Placed");
        paymentService.pay();
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        OrderService orderService = context.getBean(OrderService.class);
        orderService.placeOrder();

        context.close();
    }
}
```

Output:

```text
Order Placed
Payment Done
```

`AppConfig` is itself registered as a configuration bean. `@ComponentScan` discovers `OrderService` and `PaymentService` in the specified package.

When Spring creates `OrderService`, it sees that its constructor requires `PaymentService`. It creates/resolves that dependency first and then passes it to the constructor.

## 4.3 Aware interfaces

Spring provides several `Aware` interfaces through which a bean can receive information about the container.

For example, `BeanNameAware` gives the bean its registered Spring bean name.

```java
@Component("customBean")
public class UserService implements BeanNameAware {

    public UserService() {
        System.out.println("Created");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("Created " + name);
    }
}
```

Output:

```text
Created
Created customBean
```

You do not call `setBeanName()` yourself. Spring calls it as part of bean initialization.

Another example is `ApplicationContextAware`, which allows a bean to receive the application context. This can be useful in framework-level code, but ordinary application classes should usually express their dependencies through constructor injection instead.

## 4.4 Initialization callbacks

An initialization callback runs after the bean has been instantiated and its dependencies have been injected.

Spring provides three common ways to define an initialization callback:

| Method | How it works |
|---|---|
| `InitializingBean` | Implement `afterPropertiesSet()` |
| `@Bean(initMethod = "...")` | Specify a custom initialization method for a bean defined with `@Bean` |
| `@PostConstruct` | Annotate a method to run after dependency injection |

### Method 1: `InitializingBean`

```java
@Component
public class CartService implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        System.out.println("afterPropertiesSet called");
    }
}
```

### Method 2: `@Bean(initMethod = "...")`

```java
@Configuration
public class AppConfig {

    @Bean(initMethod = "init")
    public CartService cartService() {
        return new CartService();
    }
}
```

```java
public class CartService {

    public void init() {
        System.out.println("init method called");
    }
}
```

### Method 3: `@PostConstruct`

```java
@Component
public class CartService {

    private final Map<Integer, Integer> cart = new HashMap<>();

    @PostConstruct
    public void init() {
        cart.put(1, 1);
        System.out.println("PostConstruct method called");
    }
}
```

`@PostConstruct` methods run after dependency injection. In current Spring 6 / Spring Boot 3 applications, the annotation is `jakarta.annotation.PostConstruct`. Older Spring 5 / Spring Boot 2 applications generally use `javax.annotation.PostConstruct`.

> Use one initialization mechanism for a given task unless there is a clear reason to combine them. The callback method should not be used to hide required dependencies that belong in the constructor.

## 4.5 Destruction callbacks

Destruction callbacks let a bean release resources when the Spring container shuts down.

Spring provides three common approaches:

| Method | How it works |
|---|---|
| `DisposableBean` | Implement `destroy()` |
| `@Bean(destroyMethod = "...")` | Specify a custom destruction method for a bean defined with `@Bean` |
| `@PreDestroy` | Annotate a method to run before destruction |

### Method 1: `DisposableBean`

```java
@Component
public class CartService implements DisposableBean {

    @Override
    public void destroy() {
        System.out.println("destroy called");
    }
}
```

### Method 2: `@Bean(destroyMethod = "...")`

```java
@Configuration
public class AppConfig {

    @Bean(destroyMethod = "destroy")
    public CartService cartService() {
        return new CartService();
    }
}
```

```java
public class CartService {

    public void destroy() {
        System.out.println("destroy method called");
    }
}
```

### Method 3: `@PreDestroy`

```java
@Component
public class CartService {

    private final Map<Integer, Integer> cart = new HashMap<>();

    @PreDestroy
    public void destroy() {
        cart.clear();
        System.out.println("PreDestroy method called");
    }
}
```

In current Spring 6 / Spring Boot 3 applications, use `jakarta.annotation.PreDestroy`. Older Spring 5 / Spring Boot 2 applications generally use `javax.annotation.PreDestroy`.

To trigger destruction callbacks for singleton beans in a standalone annotation-based example, close the application context:

```java
context.close();
```

In a normal Spring Boot application, the framework manages application-context shutdown as the application exits.

## 4.6 What changes with lazy initialization?

For a lazy singleton, Spring delays the bean's creation and initialization until it is first needed.

The bean then goes through the normal creation, dependency-injection, and initialization stages. Its destruction callback is still invoked when the context closes, provided the bean was created and is managed by the context.

## 4.7 Prototype bean lifecycle

For prototype scope:

1. Spring creates the bean when it is requested.
2. Spring injects dependencies.
3. Spring runs the applicable initialization callbacks.
4. Spring hands the bean to the requesting code.
5. Spring does not automatically call destruction callbacks for that prototype instance.

The code that requested the prototype is responsible for releasing resources that the object owns. Java garbage collection may reclaim an unreachable object, but garbage collection is not a replacement for explicitly closing files, connections, or other resources.

## 4.8 Important distinction: `@PostConstruct` is not a general circular-dependency fix

It is possible to defer part of a dependency assignment until a callback, but this still relies on one object being completed after construction. It can create partially initialized objects and make the dependency graph difficult to reason about.

Prefer removing the cycle. Consider lazy injection only when the design genuinely requires it and the deferred dependency is safe to use.

---

# 5. Configuration Metadata

Spring can be configured in different ways. Two traditional approaches are:

1. Annotation-based / Java-based configuration.
2. XML-based configuration.

Spring Boot applications generally prefer annotation-based and Java-based configuration, although XML configuration is still supported.

---

# 6. XML-Based Configuration

## 6.1 Define beans in `beans.xml`

Create `beans.xml` under `src/main/resources`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="orderService" class="com.example.OrderService">
        <constructor-arg ref="paymentService"/>
    </bean>

    <bean id="paymentService" class="com.example.PaymentService"/>

</beans>
```

Explanation:

- `id` is the bean name.
- `class` gives the fully qualified Java class name.
- `constructor-arg` supplies a constructor argument.
- `ref` refers to another bean by its ID.

## 6.2 Load XML configuration

```java
public class Main {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("beans.xml");

        // Get by name and type
        OrderService orderService =
                context.getBean("orderService", OrderService.class);

        orderService.placeOrder();

        context.close();
    }
}
```

Common ways to retrieve a bean:

```java
// By name: returns Object, so a cast may be required
Object bean = context.getBean("orderService");

// By type: works when exactly one matching bean exists
OrderService service = context.getBean(OrderService.class);

// By name and type
OrderService service2 =
        context.getBean("orderService", OrderService.class);
```

If multiple beans match a type-only lookup, Spring cannot choose a unique bean and an exception is raised.

## 6.3 Define scopes in XML

The `scope` attribute specifies a bean's scope.

```xml
<bean id="orderService"
      class="com.example.OrderService"
      scope="singleton">
    <constructor-arg ref="paymentService"/>
</bean>

<bean id="paymentService"
      class="com.example.PaymentService"
      scope="prototype"/>
```

## 6.4 Inject property values

The `<property>` tag supplies a property through its setter.

```xml
<bean id="orderService" class="com.example.OrderService">
    <constructor-arg ref="paymentService"/>
    <property name="orderId" value="12345"/>
</bean>
```

This expects a corresponding setter such as `setOrderId(...)` on the Java class.

## 6.5 Inject collections

XML configuration supports collection elements such as:

- `<list>`
- `<set>`
- `<map>`
- `<props>`

These can be used to provide collection values and references to beans.

## 6.6 Configure initialization and destruction methods

The `init-method` and `destroy-method` attributes specify lifecycle callback methods.

```xml
<bean id="cartService"
      class="com.example.CartService"
      init-method="init"
      destroy-method="destroy"/>
```

The methods named `init()` and `destroy()` must exist on `CartService`.

---

# 7. Spring Boot Applications

## 7.1 Spring Boot dependencies

Two commonly used starters are:

| Dependency | Purpose |
|---|---|
| `spring-boot-starter` | Core Spring Boot starter for a basic application |
| `spring-boot-starter-web` | Adds web application support, including Spring MVC and an embedded servlet web server |

Use `spring-boot-starter-web` when building a typical Spring MVC web application. A console application does not need the web starter unless it also needs web functionality.

## 7.2 `@SpringBootApplication`

A standard Spring Boot entry point looks like this:

```java
@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

`@SpringBootApplication` is a convenience annotation that combines:

1. `@SpringBootConfiguration`
2. `@EnableAutoConfiguration`
3. `@ComponentScan`

### `@SpringBootConfiguration`

Identifies the class as a Spring Boot configuration class. It is a specialized form of `@Configuration`.

### `@ComponentScan`

Scans for components such as `@Component`, `@Service`, `@Repository`, and `@Controller`.

By default, component scanning starts from the package containing the application class and includes its subpackages. This is why the main application class is commonly placed in a top-level package.

### `@EnableAutoConfiguration`

Enables Spring Boot's auto-configuration mechanism.

Spring Boot examines the classpath, existing beans, and configuration properties to decide which configuration should be applied.

For example, when web dependencies are present, Boot can configure common web infrastructure and an embedded server.

Auto-configuration is conditional. Two important conditions are:

- `@ConditionalOnClass`: Apply configuration when a specified class is present on the classpath.
- `@ConditionalOnMissingBean`: Apply configuration when a suitable bean has not already been provided by the application.

Spring Boot's auto-configuration classes use conditions so that defaults can be applied when appropriate and replaced by application-defined beans when necessary.

## 7.3 Running a Spring Boot application

```java
@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context =
                SpringApplication.run(MyApplication.class, args);

        OrderService orderService = context.getBean(OrderService.class);
        orderService.placeOrder();
    }
}
```

`SpringApplication.run()` starts the application and returns its application context.

For a web application, startup includes creating the web application context and starting the embedded server.

Example services:

```java
@Component
public class OrderService {
    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        System.out.println("Order Placed");
        paymentService.pay();
    }
}
```

```java
@Component
public class PaymentService {

    public void pay() {
        System.out.println("Payment Done");
    }
}
```

The output from calling `placeOrder()` is:

```text
Order Placed
Payment Done
```

In ordinary application code, constructor injection is generally preferred over repeatedly calling `context.getBean()`. Direct bean lookup can still be useful in small demonstrations, framework code, or cases where programmatic lookup is specifically needed.

---

# 8. Configuration and Properties Files

Spring Boot supports external configuration so values such as ports, database settings, and service options do not need to be hard-coded into Java classes.

Common configuration sources include:

- `application.properties`
- `application.yml` / `application.yaml`
- Environment variables
- Command-line arguments
- Spring profiles

The usual location for application configuration files is:

```text
src/main/resources/
```

## 8.1 `application.properties`

Example:

```properties
payment.gateway.type=credit_card
payment.gateway.timeout=30
```

## 8.2 Inject individual values with `@Value`

`@Value` can inject a property into a field or constructor parameter.

```java
@Component
public class PaymentGateway {

    private final String type;
    private final int timeout;

    public PaymentGateway(
            @Value("${payment.gateway.type:credit_card}") String type,
            @Value("${payment.gateway.timeout:30}") int timeout) {

        this.type = type;
        this.timeout = timeout;
    }

    public String getType() {
        return type;
    }

    public int getTimeout() {
        return timeout;
    }
}
```

The syntax is:

```text
${property.name:defaultValue}
```

For example:

```java
@Value("${payment.gateway.type:credit_card}")
```

means:

- Read `payment.gateway.type` when it is configured.
- Otherwise use `credit_card`.

The default after `:` is optional. If a required property has no value and no default, application startup may fail during property resolution or type conversion.

Constructor injection makes the values explicit and allows the fields to be `final`.

## 8.3 Group related values with `@ConfigurationProperties`

When several properties belong together, `@ConfigurationProperties` is usually more convenient than adding multiple `@Value` annotations.

```java
@ConfigurationProperties(prefix = "payment.gateway")
public class PaymentGatewayProperties {

    private String type = "credit_card";
    private int timeout = 30;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getTimeout() {
        return timeout;
    }

    public void setTimeout(int timeout) {
        this.timeout = timeout;
    }
}
```

The prefix maps the class to properties such as:

```text
payment.gateway.type
payment.gateway.timeout
```

### Registering the properties class

A `@ConfigurationProperties` class must be registered so Spring Boot can create and bind it.

One option is to enable scanning:

```java
@SpringBootApplication
@ConfigurationPropertiesScan
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

Another option is to use `@EnableConfigurationProperties(PaymentGatewayProperties.class)` on a configuration class.

A third option is to annotate the properties class with `@Component`, along with `@ConfigurationProperties`, so it is found by component scanning.

## 8.4 `application.yml`

The same configuration can be expressed in YAML:

```yaml
payment:
  gateway:
    type: credit_card
    timeout: 30
```

YAML represents nested properties using indentation.

---

# 9. Running Code at Application Startup

Spring Boot provides two useful interfaces for running code after the application context has been initialized:

- `ApplicationRunner`
- `CommandLineRunner`

Both are called during application startup after the context has been refreshed.

## 9.1 `ApplicationRunner`

`ApplicationRunner` receives an `ApplicationArguments` object, which provides access to parsed command-line arguments.

```java
@Component
public class StartupPrinter implements ApplicationRunner {

    private final PaymentGatewayProperties properties;

    public StartupPrinter(PaymentGatewayProperties properties) {
        this.properties = properties;
    }

    @Override
    public void run(ApplicationArguments args) {
        System.out.println("Payment Gateway Type: " + properties.getType());
        System.out.println("Payment Gateway Timeout: " + properties.getTimeout());
    }
}
```

Spring invokes `run()` automatically during application startup because `StartupPrinter` is a registered bean.

## 9.2 `CommandLineRunner`

`CommandLineRunner` serves a similar purpose, but its `run()` method receives the raw command-line arguments as a `String` array.

```java
@Component
public class StartupPrinter implements CommandLineRunner {

    @Override
    public void run(String... args) {
        System.out.println("Application started");
    }
}
```

### `ApplicationRunner` vs `CommandLineRunner`

| Interface | Method argument |
|---|---|
| `ApplicationRunner` | `ApplicationArguments` |
| `CommandLineRunner` | `String... args` |

Use `ApplicationRunner` when the parsed argument API is useful. Use `CommandLineRunner` when the raw argument strings are sufficient.

> A class that implements either interface must also be registered as a Spring bean—for example, with `@Component` or a `@Bean` method. Likewise, a `@ConfigurationProperties` class must be registered through scanning, `@EnableConfigurationProperties`, or component scanning before it can be injected.

---

# 10. Quick Revision

## Circular dependencies

- A circular dependency exists when beans depend on each other in a cycle.
- Constructor-injection cycles cannot normally be resolved by Spring.
- Spring Boot 2.6+ disallows circular references by default.
- Prefer refactoring the design.
- `@Lazy` at an injection point can defer resolving a dependency through a proxy.
- Setter/field injection is not a general design fix.

## Bean scopes

- `singleton` is the default: one instance per bean definition, per container.
- `prototype`: a new instance each time the container is asked for the bean.
- Web scopes include `request`, `session`, `application`, and `websocket`.
- A prototype injected into a singleton is normally injected once when that singleton is created.
- Spring does not automatically invoke destruction callbacks for prototype beans.

## Initialization

- Non-lazy singleton beans are normally created eagerly.
- `@Lazy` delays creation until a bean is needed.
- `@Lazy` at an injection point can inject a lazy-resolution proxy.
- Scope and initialization timing are different concepts.

## Bean lifecycle

- Instantiation
- Dependency injection / property population
- `Aware` callbacks
- Before-initialization bean post-processing
- Initialization callbacks
- After-initialization bean post-processing
- Bean ready for use
- Destruction callbacks when the context closes

## Lifecycle callbacks

- Initialization: `InitializingBean.afterPropertiesSet()`, `@Bean(initMethod = "...")`, `@PostConstruct`.
- Destruction: `DisposableBean.destroy()`, `@Bean(destroyMethod = "...")`, `@PreDestroy`.
- Prototype destruction is not automatically managed by Spring.
- Spring Boot 3 / Spring 6 uses `jakarta.annotation`; older Spring 5 / Boot 2 projects generally use `javax.annotation`.

## Configuration

- Java/annotation-based configuration is the usual approach in Spring Boot.
- XML configuration is still supported.
- `@Value` is useful for injecting individual property values.
- `@ConfigurationProperties` is useful for binding related properties into a type-safe class.
- A configuration-properties class must be registered with Spring.

## Spring Boot

- `spring-boot-starter` provides core starter dependencies.
- `spring-boot-starter-web` adds web application support.
- `@SpringBootApplication` combines `@SpringBootConfiguration`, `@EnableAutoConfiguration`, and `@ComponentScan`.
- `SpringApplication.run()` starts the application and returns the application context.
- Auto-configuration is conditional on classpath contents, existing beans, and configuration.
- `ApplicationRunner` receives parsed application arguments.
- `CommandLineRunner` receives raw command-line arguments.

---

# 11. Important Clarifications Added During Refactoring

These points are worth remembering because the original notes described them too broadly:

1. **Circular references:** Setter/field injection may allow certain cycles, but Boot 2.6+ disables circular references by default. `@Lazy` can defer resolution, but refactoring is the preferred fix.
2. **Singleton meaning:** Singleton means one instance per bean definition per container—not one object of a Java class across the whole application.
3. **Prototype cleanup:** Spring does not invoke prototype destruction callbacks automatically. Garbage collection should not be relied on to close resources.
4. **Lazy initialization:** `@Lazy` on a bean and `@Lazy` on an injection point have related but different effects. The latter can inject a lazy-resolution proxy.
5. **Lifecycle ordering:** `Aware` callbacks and bean post-processing are part of the lifecycle; initialization callbacks run after dependency injection.
6. **Configuration properties:** A class annotated with `@ConfigurationProperties` must also be registered with Spring.
7. **Startup runners:** `ApplicationRunner` and `CommandLineRunner` are called automatically only when their implementations are registered as beans.
