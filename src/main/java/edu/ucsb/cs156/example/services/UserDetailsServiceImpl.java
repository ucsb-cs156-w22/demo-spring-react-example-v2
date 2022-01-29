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
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public static class UsernameNotFoundException extends RuntimeException {
        public UsernameNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(email);
        }
        return new UserDetailsImpl(user.get());
    }
}