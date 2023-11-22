package com.example.demo.repositories;

import com.example.demo.domain.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/**
 *
 */

@CrossOrigin("*")
public interface PartRepository extends JpaRepository<Part, Long> {
  @Query("SELECT p FROM Part p WHERE p.name LIKE %?1%")
  List<Part> search(String keyword);
}
