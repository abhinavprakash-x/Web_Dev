package com.example.demo2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.example.demo2.payment.CardPayment;
import com.example.demo2.payment.PaymentService;
import com.example.demo2.payment.UpiPayment;

@Configuration 
@ComponentScan("com.example.demo2")
public class AppConfig {
    @Bean
    public PaymentService createUpiService() {
        return new UpiPayment();
    }

    @Bean
    @Primary 
    public PaymentService createCardService() {
        return new CardPayment();
    }

    @Bean 
    public OrderService createOrderService(PaymentService s) {
        return new OrderService(s);
    }
}
