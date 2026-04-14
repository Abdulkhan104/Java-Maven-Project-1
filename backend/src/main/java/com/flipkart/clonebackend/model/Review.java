package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    private Integer rating;
    
    @Column(name = "review_text", length = 1000)
    private String reviewText;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public Review() {}
    
    public Review(User user, Product product, Integer rating, String reviewText) {
        this.user = user;
        this.product = product;
        this.rating = rating;
        this.reviewText = reviewText;
    }
    
    // Getters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public Product getProduct() { return product; }
    public Integer getRating() { return rating; }
    public String getReviewText() { return reviewText; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setProduct(Product product) { this.product = product; }
    public void setRating(Integer rating) { this.rating = rating; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}