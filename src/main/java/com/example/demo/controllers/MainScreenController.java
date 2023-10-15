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
  public ResponseEntity<List<Part>> listParts(@RequestParam(value = "partKeyword", required = false) String partKeyword) {
    List<Part> partList = partService.listAll(partKeyword);
    return ResponseEntity.ok(partList);
  }

  @GetMapping("/products")
  public ResponseEntity<List<Product>> listProducts(@RequestParam(value = "productKeyword", required = false) String productKeyword) {
    List<Product> productList = productService.listAll(productKeyword);
    return ResponseEntity.ok(productList);
  }

  @GetMapping("/about")
  public ResponseEntity<String> about() {
    return ResponseEntity.ok("This is the about page.");
  }
}