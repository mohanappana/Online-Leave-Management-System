package com.mohan.OLMS.security.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String username;
    private String jwtToken;
    private String roles;



}
