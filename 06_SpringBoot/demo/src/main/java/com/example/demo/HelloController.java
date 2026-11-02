package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "<h1>Hello, World!</h1>";
    }

    @GetMapping("hello")
    public String hello() {
        return "Hello, Abhinav";
    }
    
}