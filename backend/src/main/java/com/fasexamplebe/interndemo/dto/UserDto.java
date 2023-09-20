package com.fasexamplebe.interndemo.dto;

import com.fasexamplebe.interndemo.common.UserPermissionEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String userCode;
    private String userName;
    private String password;
    private UserPermissionEnum[] permissions;
}
