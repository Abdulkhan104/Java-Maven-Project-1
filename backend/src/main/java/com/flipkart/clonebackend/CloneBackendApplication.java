package com.flipkart.clonebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CloneBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(CloneBackendApplication.class, args);
        System.out.println("🚀 Flipkart Clone Backend Started Successfully!");
        System.out.println("📦 API available at: http://localhost:8080/api");
    }
}