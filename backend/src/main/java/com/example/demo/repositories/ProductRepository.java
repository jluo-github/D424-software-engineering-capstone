package com.example.demo.repositories;

import com.example.demo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/**
 *
 */

@CrossOrigin("*")
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
    List<Product> search(String keyword);
}
