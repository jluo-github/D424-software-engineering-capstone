package com.example.demo.repositories;

import com.example.demo.domain.OutsourcedPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 */

@CrossOrigin("*")
public interface OutsourcedPartRepository extends JpaRepository<OutsourcedPart, Long> {
}
