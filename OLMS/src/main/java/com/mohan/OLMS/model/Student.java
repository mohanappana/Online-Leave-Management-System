package com.mohan.OLMS.model;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private String studentId;
    private String studentName;
    private String studentEmail;
    private Long studentPhone;
    private String studentPassword;
    private String studentAddedBy;
    private String role;
}
