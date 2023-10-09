package com.example.demo.controllers;


import com.example.demo.domain.InhousePart;
import com.example.demo.service.InhousePartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/inhouseParts")
public class AddInhousePartController {

    @Autowired
    private InhousePartService inhousePartService;

    @GetMapping("/add")
    public ResponseEntity<InhousePart> showFormAddInhousePart() {

        InhousePart inhousepart = new InhousePart();
        return ResponseEntity.ok(inhousepart);
    }


    @PostMapping("/add")
    public ResponseEntity<?> submitForm(@Valid @RequestBody InhousePart part, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation failed");
        } else {
            InhousePart existingPart = inhousePartService.findById((int) part.getId());
            if (existingPart != null) {
                part.setProducts(existingPart.getProducts());
            }
            inhousePartService.save(part);
            return ResponseEntity.ok(part);
        }
    }
}




