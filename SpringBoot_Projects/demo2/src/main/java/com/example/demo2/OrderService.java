package com.example.demo2;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;

import com.example.demo2.payment.PaymentService;

// @Component
public class OrderService {
    // Field Injection, not recommended
    // @Autowired 
    private final PaymentService service;

    // Constructor Injection, most recommended
    // Since only one Constructor no need to write @Autowired either.
    // @Autowired 
    public OrderService(PaymentService s) {
        this.service = s;
    }

    // // Setter Injection
    // @Autowired 
    // public void set(PaymentService s) {
    //     this.service = s;
    // }

    public void placeOrder() {
        service.pay();
        System.out.println("Order Placed.");
    }
}