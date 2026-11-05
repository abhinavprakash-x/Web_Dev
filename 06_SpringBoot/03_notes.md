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