package com.mohan.OLMS.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TeacherEntity {
    @Id
    @Column(name = "TeacherId")
    private String teacherId;
    @Column(name = "TeacherName")
    private String teacherName;
    @Column(name = "TeacherEmailId")
    private String teacherEmail;
    @Column(name = "TeacherPhoneNumber")
    private Long teacherPhone;
    @Column (name = "TeacherPassword")
    private String teacherPassword;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name ="role_id",referencedColumnName ="roleid")
    private RoleEntity role;

}
