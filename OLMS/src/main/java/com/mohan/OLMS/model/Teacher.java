package com.mohan.OLMS.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    private String teacherId;
    private String teacherName;
    private String teacherEmail;
    private Long teacherPhone;
    private String teacherPassword;

}
