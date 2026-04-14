package com.flipkart.clonebackend.controller;

import com.flipkart.clonebackend.dto.CartRequest;
import com.flipkart.clonebackend.model.CartItem;
import com.flipkart.clonebackend.model.User;
import com.flipkart.clonebackend.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    private User getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        if (user == null) {
            user = new User();
            user.setId(1L);
            user.setEmail("demo@example.com");
            user.setFullName("Demo User");
        }
        return user;
    }
    
    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(HttpSession session) {
        return ResponseEntity.ok(cartService.getUserCart(getCurrentUser(session)));
    }
    
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartRequest request, HttpSession session) {
        return ResponseEntity.ok(cartService.addToCart(getCurrentUser(session), 
                request.getProductId(), request.getQuantity()));
    }
    
    @PutMapping("/{cartItemId}")
    public ResponseEntity<Void> updateCartItem(@PathVariable Long cartItemId, 
                                                @RequestParam Integer quantity,
                                                HttpSession session) {
        cartService.updateCartItem(getCurrentUser(session), cartItemId, quantity);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId, HttpSession session) {
        cartService.removeFromCart(getCurrentUser(session), cartItemId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(HttpSession session) {
        cartService.clearCart(getCurrentUser(session));
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/total")
    public ResponseEntity<Map<String, BigDecimal>> getCartTotal(HttpSession session) {
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("total", cartService.getCartTotal(getCurrentUser(session)));
        return ResponseEntity.ok(response);
    }
}