package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.StudentDTO;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface StudentService {
    boolean addStudent(Student student);

    List<Student> getAllStudents();

    boolean deleteStudent(String studentId);

    boolean updateStudent(String studentId, Student updateStudent);


    StudentDTO getStudentById(String studentId);

    Map<String, Object> getStudentProfile(String username);
}
