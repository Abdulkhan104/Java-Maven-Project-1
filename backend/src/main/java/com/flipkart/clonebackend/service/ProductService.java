package com.flipkart.clonebackend.service;

import com.flipkart.clonebackend.model.Product;
import com.flipkart.clonebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
    
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
    
    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }
    
    public List<Product> getNewArrivals() {
        return productRepository.findByIsNewTrue();
    }
    
    public List<Product> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword);
    }
    
    public List<Product> filterByPrice(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceRange(minPrice, maxPrice);
    }
}