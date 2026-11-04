package com.example.demo2.payment;

// import org.springframework.stereotype.Component;

// @Component 
public class CardPayment implements PaymentService {
    @Override 
    public void pay() {
        System.out.println("Card Payment Done.");
    }
}
