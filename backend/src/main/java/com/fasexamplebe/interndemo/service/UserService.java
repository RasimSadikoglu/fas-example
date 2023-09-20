package com.fasexamplebe.interndemo.service;

import com.fasexamplebe.interndemo.config.JwtUtils;
import com.fasexamplebe.interndemo.config.UserDetailsImpl;
import com.fasexamplebe.interndemo.dto.LoginRequest;
import com.fasexamplebe.interndemo.dto.UserDto;
import com.fasexamplebe.interndemo.exception.PueErrorException;
import com.fasexamplebe.interndemo.model.User;
import com.fasexamplebe.interndemo.model.UserPermission;
import com.fasexamplebe.interndemo.repository.UserPermissionRepository;
import com.fasexamplebe.interndemo.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserPermissionRepository userPermissionRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserPermissionRepository userPermissionRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userPermissionRepository = userPermissionRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    public void createUserWithPermissions(UserDto userDto) {
        User user = new User();
        user.setUserCode(userDto.getUserCode());
        user.setUserName(userDto.getUserName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        List<UserPermission> permissions = Arrays.stream(userDto.getPermissions()).map(x -> {
            UserPermission permission = new UserPermission();
            permission.setUserCode(user.getUserCode());
            permission.setPermission(x);
            return permission;
        }).collect(Collectors.toList());

        userRepository.save(user);
        userPermissionRepository.saveAll(permissions);
    }

    public String login(LoginRequest request) throws PueErrorException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.userCode, request.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return jwt;
    }

    public Optional<String> getUserName(String userCode) {
        Optional<User> user = userRepository.findByUserCode(userCode);
        return user.map(User::getUserName);
    }
}
