## Servlet and Servlet Container

Servlets are Java programs that run on a web server or application server and handle requests and responses in a web application.
They are part of the Java EE (Enterprise Edition) platform and provide a way to create dynamic web content.

Servlet containers, also known as servlet engines, are the runtime environments that manage the lifecycle of servlets.
They handle the communication between the web server and the servlets, manage resources, and provide services such
as request handling, session management, and security.

Tomcat is a popular open-source servlet container that implements the Java Servlet and JavaServer Pages (JSP) specifications.

- JAR (Java ARchive) files are used to package Java classes and associated metadata and resources into a single file for distribution.
- WAR (Web Application Archive) files are used to package web applications, including servlets, JSPs, HTML files, and other resources,
into a single file for deployment on a servlet container.

## Servlet Application

@WebServlet is an annotation used to declare a servlet in a Java web application. It allows developers to define the servlet's URL
mapping and other configuration settings directly in the code, rather than using a separate deployment descriptor (web.xml).

download jakarta.servlet-api.jar
```java

@WebServlet("/user")
public class User extends HttpServlet {
    private DBService dbService = new DBSservice();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        // Handle GET request
        String id = request.getParameter("id");

        if(id == null) {
            List<User> users = dbService.getAllUsers();
            response.setStatus(200);
            response.setContentType("application/json");
            response.getWriter().write("{\"users\": " + users + "}");
        }

        User user = dbService.getUserById(Integer.parseInt(id));
        if(user == null) {
            response.setStatus(404);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"User not found\"}");
            return;
        }
        response.setStatus(200);
        response.setContentType("application/json");
        response.getWriter().write("{\"user\": " + user + "}");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // Handle POST request
        Integer id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        Integer age = Integer.parseInt(request.getParameter("age"));

        if(id == null || name == null || email == null || age == null) {
            response.setStatus(400);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Missing required parameters\"}");
            return;
        }

        User user = new User(id, name, email, age);
        User savedUser = dbService.saveUser(user);

        response.setStatus(201);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"User saved successfully\"}");
        return;
    }

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response) {
        // Handle PUT request
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response){
        // Handle DELETE request
    }
}

public class User {
    private Integer id;
    private String name;
    private String email;
    private Integer age;

    public User(Integer id, String name, String email, Integer age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // Getters and setters
}

public class DBService {
    private Map<Integer, User> userDB = new HashMap<>();

    public List<User> getAllUsers() {
        return new ArrayList<>(userDB.values());
    }

    public User getUserById(Integer id) {
        return userDB.getOrDefault(id, null);
    }

    public User saveUser(User user) {
        userDB.put(user.getId(), user);
        return user;
    }
}
```

Then make a war file and deploy it to Tomcat server. You can access the servlet using the URL pattern defined in the
@WebServlet annotation (e.g., http://localhost:8080/yourapp/user).

## servlet lifecycle
- init(): This method is called when the servlet is first loaded into memory. It is used for
initialization tasks, such as setting up resources or reading configuration parameters.
- service(): This method is called for each request to the servlet. It handles the request and
generates a response. The service() method can be overridden to handle specific HTTP methods (e.g., doGet(), doPost()).
- destroy(): This method is called when the servlet is being unloaded from memory. It is used for cleanup tasks,
such as releasing resources or closing connections.