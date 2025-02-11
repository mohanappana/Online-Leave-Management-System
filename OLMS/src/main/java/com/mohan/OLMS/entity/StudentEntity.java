package com.mohan.OLMS.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StudentEntity {
    @Id
    @Column(name = "StudentId")
    private String studentId;
    @Column(name = "StudentName")
    private String studentName;
    @Column(name = "StudentEmailId")
    private String studentEmail;
    @Column(name = "StudentPhoneNumber")
    private Long studentPhone;
    @Column(name = "StudentPassword")
    private String studentPassword;
    @Column(name = "StudentAddedBy")
    private String studentAddedBy;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name ="role_id",referencedColumnName ="roleid")
    private RoleEntity role;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<LeaveEntity> leaves;
}
