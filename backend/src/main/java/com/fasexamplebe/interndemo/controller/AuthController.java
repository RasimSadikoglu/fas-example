package com.fasexamplebe.interndemo.controller;

import com.fasexamplebe.interndemo.dto.UserAuthDetail;
import com.fasexamplebe.interndemo.service.AuthService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping()
    public UserAuthDetail loginWithToken() {
        return authService.loginWithToken();
    }
}
