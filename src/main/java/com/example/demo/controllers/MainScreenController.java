package com.example.demo.controllers;

import com.example.demo.domain.Part;
import com.example.demo.domain.Product;
import com.example.demo.service.PDFPartService;
import com.example.demo.service.PDFProductService;
import com.example.demo.service.PartService;
import com.example.demo.service.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainScreenController {

  private final PartService partService;
  private final ProductService productService;
  private final PDFPartService pdfPartService;
  private final PDFProductService pdfProductService;

  public MainScreenController(PartService partService, ProductService productService, PDFPartService pdfPartService, PDFProductService pdfProductService) {
    this.partService = partService;
    this.productService = productService;
    this.pdfPartService = pdfPartService;
    this.pdfProductService = pdfProductService;
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

  @GetMapping("/parts/report")
  public void generatePartPDF(HttpServletResponse response) throws Exception {
    response.setContentType("application/pdf");
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());

    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
//    response.setHeader("Content-Disposition", "attachment; filename=parts.pdf");
    response.setHeader(headerKey, headerValue);

    List<Part> partList = partService.listAll(null);
    pdfPartService.export(partList, response);

  }

  @GetMapping("/products/report")
  public void generateProductPDF(HttpServletResponse response) throws Exception {
    response.setContentType("application/pdf");
    DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
    String currentDateTime = dateFormatter.format(new Date());

    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
//    response.setHeader("Content-Disposition", "attachment; filename=parts.pdf");
    response.setHeader(headerKey, headerValue);

    List<Product> productList = productService.listAll(null);
    pdfProductService.export(productList, response);

  }


}