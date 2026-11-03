# Maven

## What are JAR Files
Normal Execution:
Java Code -> Compile -> Bytecode .class Files -> JVM -> Output
For Multiple files, multiple .class files exist.
And in big projects, sharing individual files can be a headache
so why don't we zip all of the class files? Yes. That is a JAR.

JAR: Java Archives
It can contain class files, resources/assets and folders/packages.
You can also import/export libraries as jar files (like .dll and .so files in C/C++)
There are two types of JAR
- Non Executable (Doesn't package other dependencies but only links them using pom.xml)
- Executable JAR (Packages all dependencies too)

## Maven
It helps in automatically managing the project and these dependecies/jar files.
It is a project management tool and mainly does these 4 things
- maintain folder structure
- helps in compiling
- creates jar files
- download and manage dependencies (transitive dependencies too A->B->C)

## Folder Structure
```text
Demo
|
|--- pom.xml (project object model)
|
|--- src (code)
|    |
|    |--- main (app source code)
|    |    |
|    |    |--- java (java code)
|    |    |    |
|    |    |    |--- com/example/demo
|    |    |    |                |
|    |    |    |                |--- Main.java
|    |    |
|    |    |--- resources (assets/ properties/ etc.)
|    |
|    |--- test (unit tests)
|
|--- target (class files)
```

`mvnrepository.com` Used to find libraries.
Usually we use domain name as our project structure
eg. `com.abhinav/project-name/main.java`

pom.xml:
Contains xml tags
Important -> groupid artifactid version
pom -> parent pom -> super pom
effective pom: maven uses this pom for project

Maven uses 2 repositories
- Central Repositry
- Local --> C://Users/Name/.m2/repositories
- Other remote (private company repo)

Our own project jar files are also stored there in local

Maven Lifecycle
- clean (delete target folder)
- default
- - validate (check syntax etc)
- - compile (class files)
- - test (unit tests)
- - package (jar file)
- - verify (integration testing, quality testing, configure pom.xml plugins)
- - install (install jar in local .m2 repository)
- - deploy (remote repository upload)
- site (documentation and stuff)

If you perform any step all steps above it automatically execute in order.


# Spring Core

## Dependency Injection
Tight Coupling: Code modules depend on each other heavily.
Which is generally a bad practice. So a Separate method can be created to
handle the dependent portion to reduce coupling.
This is called Dependency Injection.

- S Single Responsibility
- O Open/Close
- L
- I
- D
`Chatgpt complete this portion of SOLID Principles.`

Eg. of Tight Coupled System
```java
class SmsNotifoication {
    public void call() {
        System.out.println("SMS Notification");
    }
}

class Order {
    SmsNotification notification = new SmsNotification(); // Tight Coupling
    public void place() {
        System.out.println("Order Placed\n");
        notification.call();
    }
}

class main() {
    public static void main(String args[]) {
        Order o = new Order();
        o.place();
    }
}
```

Eg. of Loosely Coupled System
```java
interface Notification {
    public void call();
}

class SmsNotifoication implements Notification {
    @Overrides
    public void call() {
        System.out.println("SMS Notification");
    }
}

class EmailNotification implements Notification {
    @Overrides
    public void call() {
        System.out.println("Email Notification");
    }
}

class Order {
    Notification notification; // Loose coupling

    public void choose(Notification x) {
        this.notification = x;
    }

    public void place() {
        System.out.println("Order Placed\n");
        notification.call();
    }
}

class main() {
    public static void main(String args[]) {
        Order o = new Order();
        Notification n = new EmailNotification();
        o.choose(n); // Dependency Injection
        o.place();
    }
}
```

But even this will eventually lead to main class getting too complicated
so Spring Core makes it simple and easy to manage.

## Inversion Of Control (IOC)
IOC is idea/principle
Dependency Control is an approach to do IOC

Spring Core has IOC Containers which:
- creates and manages objects
- connects objects together

Java Class -> Objects
Spring IOC Container -> Beans