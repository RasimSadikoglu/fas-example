package com.fasexamplebe.interndemo.service;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import com.fasexamplebe.interndemo.dto.UserAuthDetail;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class AuthService {

    public UserAuthDetail loginWithToken() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserAuthDetail authDetail = new UserAuthDetail();
        authDetail.userCode = userDetails.getUsername();
        authDetail.authorities = userDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .map(UserPermissionEnum::valueOf)
                .collect(Collectors.toList());

        return authDetail;
    }

}
