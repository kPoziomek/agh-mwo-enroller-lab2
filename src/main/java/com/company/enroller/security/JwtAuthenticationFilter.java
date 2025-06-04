package com.company.enroller.security;

import com.company.enroller.persistence.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private ParticipantService participantService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String login = null;
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                login = jwtUtil.getLoginFromToken(token);
            } catch (Exception e) {
                System.out.println("Error extracting login from token: " + e.getMessage());
            }
        } else {
            System.out.println("No Bearer token found in Authorization header");
        }
        
        // Jeśli token jest ważny i użytkownik nie jest już zalogowany
        if (login != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            if (jwtUtil.validateToken(token)) {
                if (participantService.findByLogin(login) != null) {

                    UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(login, null, new ArrayList<>());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    
                } else {
                    System.out.println("User not found in database");
                }
            } else {
                System.out.println("Token validation failed");
            }
        } else if (login != null) {
            System.out.println("User already authenticated");
        }
        
        filterChain.doFilter(request, response);
    }
}
