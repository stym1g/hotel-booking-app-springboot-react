package com.example.hotelbookingappspringbootreact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HotelBookingAppSpringbootReactApplication {

    public static void main(String[] args) {
        SpringApplication.run(HotelBookingAppSpringbootReactApplication.class, args);
    }

}
