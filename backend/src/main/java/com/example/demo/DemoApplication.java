package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {

    SpringApplication.run(DemoApplication.class, args);


  }

  @Controller
  public class HelloWorldController {
    @GetMapping("/")
    public ResponseEntity<String> about() {

      return ResponseEntity.ok("Hello! The PurpleCat PC Store Inventory Management Application is running!");
    }
  }

}
