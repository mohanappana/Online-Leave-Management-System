package com.mohan.OLMS.services;

import com.mohan.OLMS.model.Teacher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface TeacherService {

    boolean addTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();


    boolean deleteTeacher(String teacherId);

    boolean updateTeacher(String studentId, Teacher teacher);

    Map<String, Object> getTeacherProfile(String username);
}
