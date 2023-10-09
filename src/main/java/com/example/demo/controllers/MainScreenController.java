package com.example.demo.controllers;

import com.example.demo.domain.Part;
import com.example.demo.domain.Product;
import com.example.demo.service.PartService;
import com.example.demo.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainScreenController {
    private final PartService partService;
    private final ProductService productService;

    public MainScreenController(PartService partService, ProductService productService) {
        this.partService = partService;
        this.productService = productService;
    }

    @GetMapping("/parts")
    public ResponseEntity<List<Part>> listParts(@RequestParam(value = "keyword", required = false) String keyword) {
        List<Part> partList = partService.listAll(keyword);
        return ResponseEntity.ok(partList);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> listProducts(@RequestParam(value = "keyword", required = false) String keyword) {
        List<Product> productList = productService.listAll(keyword);
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/about")
    public ResponseEntity<String> about() {
        return ResponseEntity.ok("This is the about page.");
    }
}