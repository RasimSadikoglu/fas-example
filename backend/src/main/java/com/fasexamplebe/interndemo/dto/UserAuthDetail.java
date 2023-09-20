package com.fasexamplebe.interndemo.dto;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UserAuthDetail {
    public String token;
    @NotNull
    public String userCode;
    @NotNull
    public List<UserPermissionEnum> authorities;
}
