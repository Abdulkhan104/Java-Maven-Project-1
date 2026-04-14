package com.flipkart.clonebackend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "order_number", unique = true, nullable = false)
    private String orderNumber;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "total_amount")
    private BigDecimal totalAmount;
    
    @Column(name = "discount_amount")
    private BigDecimal discountAmount;
    
    @Column(name = "final_amount")
    private BigDecimal finalAmount;
    
    @Column(name = "order_status")
    private String orderStatus = "PENDING";
    
    @Column(name = "payment_status")
    private String paymentStatus = "PENDING";
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "shipping_address", length = 1000)
    private String shippingAddress;
    
    @Column(name = "ordered_at")
    private LocalDateTime orderedAt = LocalDateTime.now();
    
    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;
    
    public Order() {}
    
    // Getters
    public Long getId() { return id; }
    public String getOrderNumber() { return orderNumber; }
    public User getUser() { return user; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public BigDecimal getFinalAmount() { return finalAmount; }
    public String getOrderStatus() { return orderStatus; }
    public String getPaymentStatus() { return paymentStatus; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getShippingAddress() { return shippingAddress; }
    public LocalDateTime getOrderedAt() { return orderedAt; }
    public LocalDateTime getDeliveredAt() { return deliveredAt; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public void setUser(User user) { this.user = user; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public void setDiscountAmount(BigDecimal discountAmount) { this.discountAmount = discountAmount; }
    public void setFinalAmount(BigDecimal finalAmount) { this.finalAmount = finalAmount; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public void setOrderedAt(LocalDateTime orderedAt) { this.orderedAt = orderedAt; }
    public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }
}