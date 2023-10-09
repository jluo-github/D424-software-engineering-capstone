package com.example.demo.controllers;

import com.example.demo.domain.Part;
import com.example.demo.domain.Product;
import com.example.demo.service.PartService;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class AddProductController {

    private static Product product1;
    private final ProductService productService;
    private final PartService partService;
    private List<Part> theParts;
    private Product product;

    @Autowired
    public AddProductController(ProductService productService, PartService partService) {
        this.productService = productService;
        this.partService = partService;
    }

    @GetMapping("/add")
    public ResponseEntity<Map<String, Object>> showFormAddProduct() {
        Map<String, Object> response = new HashMap<>();

        List<Part> allParts = partService.findAll();
        Product product = new Product();
        List<Part> availableParts = new ArrayList<>();

        for (Part p : allParts) {
            if (!product.getParts().contains(p)) {
                availableParts.add(p);
            }
        }

        response.put("parts", allParts);
        response.put("product", product);
        response.put("availparts", availableParts);
        response.put("assparts", product.getParts());

        return ResponseEntity.ok(response);
    }


    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation failed");
        }

        if (product.getId() != 0) {
            Product existingProduct = productService.findById((int) product.getId());

            if (product.getInv() - existingProduct.getInv() > 0) {
                for (Part p : existingProduct.getParts()) {
                    int inv = p.getInv();
                    p.setInv(inv - (product.getInv() - existingProduct.getInv()));
                    partService.save(p);
                }
            }
        } else {
            product.setInv(0);
        }

        productService.save(product);

        return ResponseEntity.ok("Product added successfully");
    }

    @GetMapping("/update/{productID}")
    public ResponseEntity<Map<String, Object>> showProductFormForUpdate(@PathVariable("productID") int theId) {
        Map<String, Object> response = new HashMap<>();

        List<Part> allParts = partService.findAll();
        Product theProduct = productService.findById(theId);

        response.put("parts", allParts);
        response.put("product", theProduct);
        response.put("assparts", theProduct.getParts());

        List<Part> availParts = new ArrayList<>();
        for (Part p : allParts) {
            if (!theProduct.getParts().contains(p)) {
                availParts.add(p);
            }
        }

        response.put("availparts", availParts);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/delete/{productID}")
    public ResponseEntity<String> deleteProduct(@PathVariable("productID") int theId) {
        Product product2 = productService.findById(theId);

        for (Part part : product2.getParts()) {
            part.getProducts().remove(product2);
            partService.save(part);
        }

        product2.getParts().clear();
        productService.save(product2);
        productService.deleteById(theId);

        return ResponseEntity.ok("Product deleted successfully");
    }


    // make the buy buttons work
    @PostMapping("/buy/{productID}")
    public ResponseEntity<String> buyProduct(@PathVariable("productID") int theId) {
        Product product3 = productService.findById(theId);

        // product inventory decreases by 1
        if (product3.getInv() > 0) {
            product3.setInv(product3.getInv() - 1);
            productService.save(product3);
            return ResponseEntity.ok("Purchase successful, you bought one product!");
        } else {
            return ResponseEntity.badRequest().body("Purchase unsuccessful, product is out of stock!");
        }
    }


    // make the add and remove buttons work
    @PostMapping("/associatepart/{partID}")
    public ResponseEntity<?> associatePart(
//            @RequestParam("productId") int productId,
            @PathVariable("partId") int partId) {

//        Product product1 = productService.findById(productId);
        // Check if the product has a name
        if (product1.getName() == null) {
            return ResponseEntity.badRequest().body("Product is not valid");
        } else {
            // Add the part to the product's parts and update the associations
            product1.getParts().add(partService.findById(partId));

            Part part = partService.findById(partId);
            part.getProducts().add(product1);

            // Save changes to the product and part
            productService.save(product1);
            partService.save(part);

            // Create a list of available parts
            List<Part> availParts = new ArrayList<>();
            for (Part p : partService.findAll()) {
                if (!product1.getParts().contains(p)) availParts.add(p);
            }

            return ResponseEntity.ok(product1);
        }
    }

    @DeleteMapping("/removepart/{partID}")
    public ResponseEntity<?> removePart(@PathVariable("partID") int theID) {
        // Check if the product has a name
        if (product1.getName() == null) {
            // Return a 400 Bad Request response with an error message
            return ResponseEntity.badRequest().body("Product is not valid");
        } else {
            product1.getParts().remove(partService.findById(theID));
            Part partToRemove = partService.findById(theID);
            partToRemove.getProducts().remove(product1);

            // Save changes to the product and part
            productService.save(product1);
            partService.save(partToRemove);

            // Create a list of available parts
            List<Part> availParts = new ArrayList<>();
            for (Part p : partService.findAll()) {
                if (!product1.getParts().contains(p)) {
                    availParts.add(p);
                }
            }

            // Return a 200 OK response with updated data in the response body
            Map<String, Object> response = new HashMap<>();
            response.put("product", product1);
            response.put("assparts", product1.getParts());
            response.put("availparts", availParts);

            return ResponseEntity.ok(response);
        }
    }
}