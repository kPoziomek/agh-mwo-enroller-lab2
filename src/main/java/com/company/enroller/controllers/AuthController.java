package com.company.enroller.controllers;

import com.company.enroller.model.Participant;
import com.company.enroller.persistence.ParticipantService;
import com.company.enroller.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private ParticipantService participantService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        try {
            Participant participant = participantService.findByLogin(loginRequest.getLogin());

            if (participant == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
            }
            
            if (!participant.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
            }
            
            String token = jwtUtil.generateToken(participant.getLogin());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", Map.of("login", participant.getLogin()));
            
            System.out.println("Returning successful login response");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.out.println("Exception in login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Login failed"));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        System.out.println("=== AUTH TEST ENDPOINT CALLED ===");
        return ResponseEntity.ok(Map.of("message", "Auth controller works!", "timestamp", System.currentTimeMillis()));
    }
    
    @PostMapping("/login-simple")
    public ResponseEntity<?> loginSimple(@RequestParam String login, @RequestParam String password) {
        System.out.println("=== SIMPLE LOGIN REQUEST ===");
        System.out.println("Login: " + login + ", Password: " + password);
        
        LoginRequest request = new LoginRequest();
        request.setLogin(login);
        request.setPassword(password);
        
        return login(request);
    }
    
    public static class LoginRequest {
        private String login;
        private String password;
        
        public String getLogin() { return login; }
        public void setLogin(String login) { this.login = login; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
