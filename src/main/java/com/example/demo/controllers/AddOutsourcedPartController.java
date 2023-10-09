package com.example.demo.controllers;

import com.example.demo.domain.OutsourcedPart;
import com.example.demo.service.OutsourcedPartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/outsourcedParts")
public class AddOutsourcedPartController {

    @Autowired
    private OutsourcedPartService outsourcedPartService;

    @GetMapping("/add")
    public ResponseEntity<OutsourcedPart> showFormAddOutsourcedPart() {

        OutsourcedPart outsourcedPart = new OutsourcedPart();

        return ResponseEntity.ok(outsourcedPart);
    }

    @PostMapping("/add")
    public ResponseEntity<?> submitForm(@Valid @RequestBody OutsourcedPart part, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation failed");
        } else {
            OutsourcedPart existingPart = outsourcedPartService.findById((int) part.getId());
            if (existingPart != null) {
                part.setProducts(existingPart.getProducts());
            }
            outsourcedPartService.save(part);
            return ResponseEntity.ok(part);
        }
    }
}

