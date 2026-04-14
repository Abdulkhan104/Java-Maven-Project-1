package com.flipkart.clonebackend.controller;

import com.flipkart.clonebackend.model.Category;
import com.flipkart.clonebackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3001")
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAllByOrderByDisplayOrderAsc());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Category>> getActiveCategories() {
        return ResponseEntity.ok(categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found")));
    }
}