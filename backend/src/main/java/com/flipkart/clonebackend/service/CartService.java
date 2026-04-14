package com.flipkart.clonebackend.service;

import com.flipkart.clonebackend.model.CartItem;
import com.flipkart.clonebackend.model.Product;
import com.flipkart.clonebackend.model.User;
import com.flipkart.clonebackend.repository.CartRepository;
import com.flipkart.clonebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<CartItem> getUserCart(User user) {
        return cartRepository.findByUser(user);
    }
    
    @Transactional
    public CartItem addToCart(User user, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        CartItem existingItem = cartRepository.findByUserAndProductId(user, productId)
                .orElse(null);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            return cartRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            return cartRepository.save(cartItem);
        }
    }
    
    @Transactional
    public void updateCartItem(User user, Long cartItemId, Integer quantity) {
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        if (quantity <= 0) {
            cartRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartRepository.save(cartItem);
        }
    }
    
    @Transactional
    public void removeFromCart(User user, Long cartItemId) {
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        cartRepository.delete(cartItem);
    }
    
    @Transactional
    public void clearCart(User user) {
        cartRepository.deleteAllByUser(user);
    }
    
    public BigDecimal getCartTotal(User user) {
        List<CartItem> cartItems = cartRepository.findByUser(user);
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            BigDecimal itemTotal = item.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);
        }
        return total;
    }
}