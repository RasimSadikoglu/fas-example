package com.fasexamplebe.interndemo.repository;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import com.fasexamplebe.interndemo.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserPermissionRepository extends JpaRepository<UserPermission, UUID> {
    List<UserPermission> findByUserCode(String userCode);

    boolean existsByUserCodeAndPermission(String userCode, UserPermissionEnum permission);
}
