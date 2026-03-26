package com.universalprinters.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.universalprinters.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByPhone(String phone);
}
