package edu.ucsb.cs156.example.models;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.context.SecurityContextHolder;

import edu.ucsb.cs156.example.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * This class implements a UserDetails similar to the MyUserPrincipal from
 * this article
 * https://www.baeldung.com/spring-security-authentication-with-a-database
 */

@Slf4j
@Data
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
    private User user;

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        log.info("authorities={}", authorities);
        return authorities;
    }

}