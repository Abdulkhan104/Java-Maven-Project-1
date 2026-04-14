package com.flipkart.clonebackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class RegisterRequest {
    @NotBlank
    @Size(min = 3, max = 100)
    private String fullName;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    private String mobile;
}