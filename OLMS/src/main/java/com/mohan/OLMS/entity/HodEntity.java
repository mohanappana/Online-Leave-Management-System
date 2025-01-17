package com.mohan.OLMS.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class HodEntity {
    @Id
    private String HodId;
    private String HodPassword;
    @OneToOne(fetch = FetchType.EAGER,cascade = {CascadeType.ALL})
    @JoinColumn(name = "role_id",referencedColumnName = "roleid")
    private RoleEntity role;


}
