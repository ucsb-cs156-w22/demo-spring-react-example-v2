package edu.ucsb.cs156.example.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.UserDetailsImpl;
import edu.ucsb.cs156.example.repositories.UserRepository;

@Service
public class MockUserDetailsServiceImpl implements UserDetailsService {

    public static User adminUser = initializeAdminUser();
    public static User regularUser = initializeRegularUser();
    
    private static User initializeAdminUser() {
        User adminUser = User.builder()
        .googleSub("adminUser")
        .email("admin@example.org")
        .pictureUrl("https://example.org/admin.jpg")
        .fullName("Admin User")
        .givenName("Admin")
        .familyName("User")
        .emailVerified(true)
        .locale("locale")
        .hostedDomain("example.org")
        .admin(true)
        .build();
        return adminUser;
    }

    private static User initializeRegularUser() {
        User regularUser = User.builder()
        .googleSub("user")
        .email("user@example.org")
        .pictureUrl("https://example.org/user.jpg")
        .fullName("Regular User")
        .givenName("Regular")
        .familyName("User")
        .emailVerified(true)
        .locale("locale")
        .hostedDomain("example.org")
        .admin(false)
        .build();
        return regularUser;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {

        if (email.equals("admin@example.org")) {
            return new UserDetailsImpl(adminUser);
        } else if (email.equals("user@example.org")) {
            return new UserDetailsImpl(regularUser);
        } else {
            throw new RuntimeException("unknown mock user details");
        }

    }
}