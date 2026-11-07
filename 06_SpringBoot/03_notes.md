## Circular Dependency:
Suppose you have two classes, A and B, where class A depends on class B and class B depends on class A. This creates a circular dependency, which can lead to issues in your application, such as stack overflow errors or difficulties in managing the lifecycle of the beans.
In Spring Boot, the IOC Container manages the dependencies between beans. However, when there is a circular dependency, the container may not be able to resolve the dependencies correctly, leading to runtime errors.

```java
public class A {
    private B b;

    public A() {
        this.b = new B();
    }
}

public class B {
    private A a;

    public B() {
        this.a = new A();
    }
}
```
This code snippet demonstrates a circular dependency between classes A and B. When
an instance of class A is created, it tries to create an instance of class B, which in turn
tries to create an instance of class A again, leading to an infinite loop and eventually a stack overflow error.

To fix the circular dependency issue, you can use one of the following approaches:
1. **Refactor the Code**: Redesign the classes to remove the circular dependency.
2. **Use Setter Injection**: Instead of using constructor injection,
you can use setter injection to break the circular dependency. Using @Autowired on setter
methods allows Spring to inject the dependencies after the beans are created, thus avoiding the circular dependency issue.
But this approach may not be ideal as it can lead to partially initialized beans
and potential NullPointerExceptions if the dependencies are accessed before they are set.
NEVER DO THIS IN SPRING BOOT APPLICATIONS it won't work above spring boot 2.6

## Bean Scopes:
1. Singleton (default) -> Only One Bean/Object will be created per Bean definition -> Eager Initialization by default
2. Prototype -> Whenever you getBean() or dependency inject, a new Bean will be created. -> Lazy Initialization by default
@Scope("singleton") or @Scope("prototype")

Other Bean Scopes:
3. Request
4. Session
5. Application

A singleton bean is managed entirely by IOC Container it is created by spring automatically when the IOC Container is created,
a prototype bean is not managed by IOC Container, it is created whenever needed.

Even in singletone multiple Beans/Objects can be made
eg.
```java
@Configuration
public class AppConfig() {
    @Bean
    public void fun1() {
        return new Student();
    }

    @Bean
    public void fun2() {
        return new Student();
    }
}
```

When to use:
1. Singleton -> For Stateless Class
2. Prototype -> For Stateful Class

State of class -> basically the fields/variables inside the class, if none then stateless.

Beans Initialization:
1. Eager
2. Lazy
Singleton Bean Initialization can be changed by Adding @Lazy decorator to a component/class.
Prototype Can never become Eager it's always lazy.

Proxy:
```java
public class OrderService {
    private PaymentService paymentService;

    public OrderService(@Lazy PaymentService ps) {
        this.paymentService = ps;
        System.out.println("Blah Blah Blah ---Dracula");
    }

    public void fun() {
        paymentService.xyz();
    }
}
```

In this example when the constructor OrderService() is called a proxy (fake object) will be passed
to OrderService's bean and only when fun() is called then real object will be made.

Circular Dependency can be fixed by @Lazy too
```java
public class A {
    private B b;

    public A(@Lazy B b) {
        this.b = b;
    }
}

@Lazy
public class B {
    private A a;

    public B(A a) {
        this.a = a;
    }
}
```

## Bean Lifecycle
Singleton Bean Lifecycle (Eager Initialization):
Bean Create -> Bean Manage -> Bean Destroy

```java
@Configuration
@ComponentScan
public class AppConfig() {}

@Component
public class OrderService() {
    private PaymentService ps;

    public OrderService(PaymentService obj) {
        this.ps = obj;
    }

    public void placeOrder() {
        System.out.println("Order Placed");
        ps.pay();
    }
}

@Component
public class PaymentService() {
    public void pay() {
        System.out.println("Payment Done");
    }
}

public class main {
    public static void main(String args[]) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        OrderService obj = context.getBean(OrderService.class);
        obj.placeOrder();
    }
}

/* Output:
Order Placed
Payment Done
*/
```

1. IOC Container starts
2. Read Configuration (AppConfig.class) and since it has ComponentScan scan all Components (and if AppConifig has any @Bean)
   NOTE: AppConfig itself is a Component and so it'll also be managed by the container.
3. ComponentScan finds OrderService and PaymentService components and reads Bean Definitions (metadata/reflection) for all Components
4. Instantiate Objects (and if any dependency is found then create that link it and then continue)
   eg. OrderService bean starts creation -> Constructor requires PaymentService so it stops ->
       Creates PaymentService -> passes it to constructor and finish creating OrderService.
   IOC Containers are smart and dependency aware. If any are lazy they are skipped for now.
5. Dependencies are Injected (if using setters/field injection for constructors it already done in 4. )
6. Aware Interfaces are called calling callback methods. This is a special step happens rarely example below.
7. Initialization Callbacks
8. Bean is ready to use
9. Destruction Callbacks (if any) are called when the container is closed. We simulate this by calling ((AnnotationConfigApplicationContext) context).close() in main method.
10. IOC Container is closed and all beans are destroyed.

Example 6:
```java
@Component("customBean")
public class UserService() implements BeanNameAware {
    public UserService() {
        System.out.println("Created");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("Created " + name);
    }
}

/* Output
Created
Created customBean
*/
```
Here we don't call setBeanName Spring automatically does it in step 6. since BeanNameAware is an Aware Interface.
Other examples -> ApplicationContextAware these are typically used for logging.

Step 7 Initialization Callbacks:
1. InitializingBean Interface -> afterPropertiesSet() method is called after all dependencies are injected.
2. init method -> method annotated with @Bean(initMethod = "init") will be called after all dependencies are injected in AppConfig class.
3. @PostConstruct Annotation -> method annotated with this will be called after all dependencies are injected
NOTE: @PostConstruct is from jakarta.annotation-api package.

```java
@Component
public class CartService() /* implements InitializingBean */ {
    map<integer, Integer> cart;

    public CartService() {
        cart = new HashMap<>();
        System.out.println("Created");
    }

    public void addToCart(int productId, int quantity) {
        cart.put(productId, quantity);
    }

    // Method 1: Using InitializingBean interface
    // @Override
    // public void afterPropertiesSet() throws Exception {
    //     cart.put(1, 1);
    //     System.out.println("afterPropertiesSet called");
    // }

    // Method 2: Using @Bean(initMethod = "init") in AppConfig class
    // public void init() {
    //     cart.put(1, 1);
    //     System.out.println("init method called");
    // }

    // Method 3: Using @PostConstruct annotation
    @PostConstruct
    public void init() {
        cart.put(1, 1);
        System.out.println("PostConstruct method called");
    }
}
```

Step 9 Destruction Callbacks:
1. DisposableBean Interface -> destroy() method is called when the container is closed.
2. destroy method -> method annotated with @Bean(destroyMethod = "destroy") will be called when the container is closed in AppConfig class.
3. @PreDestroy Annotation -> method annotated with this will be called when the container is closed
NOTE: @PreDestroy is from jakarta.annotation-api package.

```java
@Component
public class CartService() /* implements DisposableBean */ {
    map<integer, Integer> cart;

    public CartService() {
        cart = new HashMap<>();
        System.out.println("Created");
    }

    public void addToCart(int productId, int quantity) {
        cart.put(productId, quantity);
    }

    // Method 1: Using DisposableBean interface
    // @Override
    // public void destroy() throws Exception {
    //     cart.clear();
    //     System.out.println("destroy called");
    // }

    // Method 2: Using @Bean(destroyMethod = "destroy") in AppConfig class
    // public void destroy() {
    //     cart.clear();
    //     System.out.println("destroy method called");
    // }

    // Method 3: Using @PreDestroy annotation
    @PreDestroy
    public void destroy() {
        cart.clear();
        System.out.println("PreDestroy method called");
    }
}
```

If it were Lazy Initialization then the bean would not be created until it is needed.
Steps 1-3 would be same but step 4 would be skipped until the bean is needed.
And then steps 4-9 would be executed when the bean is needed.

For Prototype Bean Lifecycle (Lazy Initialization):
Steps 1-7 would be handled by IOC Container and then the Bean is handover to the client
code and then the client code is responsible for destroying the bean.
So @PreDestroy and destroy() methods do not work for prototype beans.
If you want to destroy the bean you have to do it manually in the client code or Java will do it
automatically when the object is no longer referenced and garbage collected.

Circular Dependency can be fixed by @PostConstruct annotation too.
```java
@Component
public class A {
    B b;

    public A(B b) {
        this.b = b;
    }

    @PostConstruct
    public void setB(B b) {
        b.setA(this);
    }
}

public class B {
    private A a;

    public void setA(A a) {
        this.a = a;
    }
}
```