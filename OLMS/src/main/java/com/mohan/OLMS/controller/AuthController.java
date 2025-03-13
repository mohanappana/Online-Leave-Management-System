package com.mohan.OLMS.controller;

import com.mohan.OLMS.security.jwt.JwtUtils;
import com.mohan.OLMS.security.request.LoginRequest;
import com.mohan.OLMS.security.response.LoginResponse;
import com.mohan.OLMS.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        }
       catch (AuthenticationException exception){
           Map<String, Object> map = new HashMap<>();
           map.put("message", "Bad credentials");
           map.put("status", false);
           return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);

       }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateTokenFromUsername(userDetails);
        String roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .findFirst()
                .orElse("USER");
        LoginResponse response = new LoginResponse(userDetails.getUsername(),jwtToken,roles);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        // Extract token from "Bearer <token>"
        String jwt = token.replace("Bearer ", "");
        // (Optional) Add token to blacklist here
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/login")
    public ResponseEntity<String> loginl(){
        return ResponseEntity.ok("login");
    }
}
