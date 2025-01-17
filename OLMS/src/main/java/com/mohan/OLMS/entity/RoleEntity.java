package com.mohan.OLMS.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class RoleEntity {

    @Id
    @Column(name = "roleid")
    private Long roleId;
    private String roleName;


}
