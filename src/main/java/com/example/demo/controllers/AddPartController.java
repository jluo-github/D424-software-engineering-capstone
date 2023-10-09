package com.example.demo.controllers;


import com.example.demo.domain.InhousePart;
import com.example.demo.domain.OutsourcedPart;
import com.example.demo.domain.Part;
import com.example.demo.service.InhousePartService;
import com.example.demo.service.OutsourcedPartService;
import com.example.demo.service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/parts")
public class AddPartController {

    @Autowired
    private PartService partService;

    @Autowired
    private InhousePartService inhousePartService;

    @Autowired
    private OutsourcedPartService outsourcedPartService;

    @GetMapping("/update/{partID}")
    public ResponseEntity<?> showPartFormForUpdate(@PathVariable("partID") int theId) {
        boolean inhouse = true;

        List<OutsourcedPart> outsourcedParts = outsourcedPartService.findAll();
        for (OutsourcedPart outsourcedPart : outsourcedParts) {
            if (outsourcedPart.getId() == theId) {
                inhouse = false;
                break;
            }
        }

        if (inhouse) {
            InhousePart inhousePart = inhousePartService.findById(theId);
            return ResponseEntity.ok(inhousePart);
        } else {
            OutsourcedPart outsourcedPart = outsourcedPartService.findById(theId);
            return ResponseEntity.ok(outsourcedPart);
        }
    }


    @DeleteMapping("/delete/{partID}")
    public ResponseEntity<?> deletePart(@PathVariable("partID") int theId) {
        Part part = partService.findById(theId);

        if (part.getProducts().isEmpty()) {
            partService.deleteById(theId);
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Part cannot be deleted due to existing associations with products.");
        }
    }


}