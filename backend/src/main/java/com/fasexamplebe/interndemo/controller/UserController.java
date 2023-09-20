package com.fasexamplebe.interndemo.controller;

import com.fasexamplebe.interndemo.dto.LoginRequest;
import com.fasexamplebe.interndemo.dto.UserDto;
import com.fasexamplebe.interndemo.exception.PueBaseException;
import com.fasexamplebe.interndemo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("create")
    public void createUserWithPermissions(@RequestBody UserDto user) {
        userService.createUserWithPermissions(user);
    }

    @PostMapping(path = "login", produces = "text/plain")
    public @ResponseBody ResponseEntity<String> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(userService.login(request));
        } catch (PueBaseException ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    @GetMapping("username")
    public ResponseEntity<String> getUserName(@RequestParam String userCode) {
        Optional<String> userName = userService.getUserName(userCode);
        return userName.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
