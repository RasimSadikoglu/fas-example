package com.fasexamplebe.interndemo.config;

import com.fasexamplebe.interndemo.model.User;
import com.fasexamplebe.interndemo.model.UserPermission;
import com.fasexamplebe.interndemo.repository.UserPermissionRepository;
import com.fasexamplebe.interndemo.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserPermissionRepository userPermissionRepository;

    public UserDetailsServiceImpl(UserRepository userRepository, UserPermissionRepository userPermissionRepository) {
        this.userRepository = userRepository;
        this.userPermissionRepository = userPermissionRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userCode));

        List<UserPermission> permissions = userPermissionRepository.findByUserCode(userCode);

        return UserDetailsImpl.build(user, permissions);
    }

}