package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    private Integer quantity = 1;
    
    @Column(name = "added_at")
    private LocalDateTime addedAt = LocalDateTime.now();
    
    public CartItem() {}
    
    public CartItem(User user, Product product, Integer quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }
    
    // Getters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public Product getProduct() { return product; }
    public Integer getQuantity() { return quantity; }
    public LocalDateTime getAddedAt() { return addedAt; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setProduct(Product product) { this.product = product; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setAddedAt(LocalDateTime addedAt) { this.addedAt = addedAt; }
}