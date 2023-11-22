package com.example.demo.repositories;

import com.example.demo.domain.InhousePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 */

@CrossOrigin("*")
public interface InhousePartRepository extends JpaRepository<InhousePart, Long> {
}
