package com.fasexamplebe.interndemo.repository;

import com.fasexamplebe.interndemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUserCode(String userCode);

    boolean existsByUserCode(String userCode);
}
