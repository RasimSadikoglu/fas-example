package com.fasexamplebe.interndemo.controller;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import com.fasexamplebe.interndemo.service.UserPermissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("user-permission")
public class UserPermissionController {

    private final UserPermissionService userPermissionService;

    public UserPermissionController(UserPermissionService userPermissionService) {
        this.userPermissionService = userPermissionService;
    }

    @GetMapping
    public List<UserPermissionEnum> getUserPermissions(@RequestParam String userCode) {
        return userPermissionService.getUserPermissions(userCode);
    }

    @GetMapping("check")
    public boolean checkUserHasPermission(@RequestParam String userCode, @RequestParam UserPermissionEnum permission) {
        return userPermissionService.checkUserHasPermission(userCode, permission);
    }
}
