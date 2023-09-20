package com.fasexamplebe.interndemo.service;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import com.fasexamplebe.interndemo.model.UserPermission;
import com.fasexamplebe.interndemo.repository.UserPermissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPermissionService {

    private final UserPermissionRepository userPermissionRepository;

    public UserPermissionService(UserPermissionRepository userPermissionRepository) {
        this.userPermissionRepository = userPermissionRepository;
    }

    public List<UserPermissionEnum> getUserPermissions(String userCode) {
        return userPermissionRepository
                .findByUserCode(userCode)
                .stream()
                .map(UserPermission::getPermission)
                .collect(Collectors.toList());
    }

    public boolean checkUserHasPermission(String userCode, UserPermissionEnum permission) {
        return userPermissionRepository.existsByUserCodeAndPermission(userCode, permission);
    }
}
