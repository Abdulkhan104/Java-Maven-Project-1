package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    private BigDecimal originalPrice;
    private Integer discountPercent;
    private String imageUrl;
    private String images;
    private String brand;
    private BigDecimal rating;
    private Integer reviewCount;
    private Integer stockQuantity;
    private Boolean isFeatured;
    private Boolean isNew;
    private String specifications;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    public Product() {}
    
    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public Integer getDiscountPercent() { return discountPercent; }
    public String getImageUrl() { return imageUrl; }
    public String getImages() { return images; }
    public String getBrand() { return brand; }
    public BigDecimal getRating() { return rating; }
    public Integer getReviewCount() { return reviewCount; }
    public Integer getStockQuantity() { return stockQuantity; }
    public Boolean getIsFeatured() { return isFeatured; }
    public Boolean getIsNew() { return isNew; }
    public String getSpecifications() { return specifications; }
    public Category getCategory() { return category; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    public void setDiscountPercent(Integer discountPercent) { this.discountPercent = discountPercent; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setImages(String images) { this.images = images; }
    public void setBrand(String brand) { this.brand = brand; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    public void setIsNew(Boolean isNew) { this.isNew = isNew; }
    public void setSpecifications(String specifications) { this.specifications = specifications; }
    public void setCategory(Category category) { this.category = category; }
}