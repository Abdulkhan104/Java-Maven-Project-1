package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String description;
    private String imageUrl;
    private String iconUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "category")
    private List<Product> products;
    
    public Category() {}
    
    public Category(String name, String description, String imageUrl, String iconUrl, Integer displayOrder) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.iconUrl = iconUrl;
        this.displayOrder = displayOrder;
    }
    
    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getIconUrl() { return iconUrl; }
    public Integer getDisplayOrder() { return displayOrder; }
    public Boolean getIsActive() { return isActive; }
    public List<Product> getProducts() { return products; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public void setProducts(List<Product> products) { this.products = products; }
}