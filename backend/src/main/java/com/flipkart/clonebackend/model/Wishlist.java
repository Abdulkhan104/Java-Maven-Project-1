package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(name = "added_at")
    private LocalDateTime addedAt = LocalDateTime.now();
    
    public Wishlist() {}
    
    public Wishlist(User user, Product product) {
        this.user = user;
        this.product = product;
    }
    
    // Getters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public Product getProduct() { return product; }
    public LocalDateTime getAddedAt() { return addedAt; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setProduct(Product product) { this.product = product; }
    public void setAddedAt(LocalDateTime addedAt) { this.addedAt = addedAt; }
}