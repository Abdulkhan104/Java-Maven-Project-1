package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(name = "product_name")
    private String productName;
    
    private Integer quantity;
    private BigDecimal price;
    
    @Column(name = "total_price")
    private BigDecimal totalPrice;
    
    public OrderItem() {}
    
    public OrderItem(Order order, Product product, String productName, Integer quantity, BigDecimal price, BigDecimal totalPrice) {
        this.order = order;
        this.product = product;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
    }
    
    // Getters
    public Long getId() { return id; }
    public Order getOrder() { return order; }
    public Product getProduct() { return product; }
    public String getProductName() { return productName; }
    public Integer getQuantity() { return quantity; }
    public BigDecimal getPrice() { return price; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setOrder(Order order) { this.order = order; }
    public void setProduct(Product product) { this.product = product; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}