package com.flipkart.clonebackend.repository;

import com.flipkart.clonebackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderByDisplayOrderAsc();
    List<Category> findByIsActiveTrueOrderByDisplayOrderAsc();
}