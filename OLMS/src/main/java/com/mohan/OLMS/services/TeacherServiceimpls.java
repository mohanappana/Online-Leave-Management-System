package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.TeacherEntity;
import com.mohan.OLMS.model.Teacher;
import com.mohan.OLMS.repository.TeacherRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherServiceimpls implements TeacherService{
    private final TeacherRepository teacherRepository;

    public TeacherServiceimpls(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public boolean addTeacher(Teacher teacher) {
        if( teacher != null && teacher.getTeacherId() != null){
            TeacherEntity teacherEntity = new TeacherEntity();

            String TPwd_second = teacher.getTeacherName();
            teacher.setTeacherEmail(teacher.getTeacherId()+"@rguktn.ac.in");
            teacher.setTeacherPassword(teacher.getTeacherId()+"$"+teacher.getTeacherName().substring(0,4));
            BeanUtils.copyProperties(teacher,teacherEntity); 
            teacherRepository.save(teacherEntity);
            return true;

        }else {
            return false;
        }
    }

    @Override
    public List<Teacher> getAllTeachers() {
        List<TeacherEntity> teacherEntities =teacherRepository.findAll();

        List<Teacher> teachers = teacherEntities
                .stream()
                .map(teac -> new Teacher(
                        teac.getTeacherId(),
                        teac.getTeacherName(),
                        teac.getTeacherEmail(),
                        teac.getTeacherPhone(),
                        null))
                .collect(Collectors.toList());
        return teachers;
    }

    @Override
    public boolean deleteTeacher(String teacherId) {
        TeacherEntity teacherEntity =teacherRepository.findById(teacherId).get();
        teacherRepository.delete(teacherEntity);
        return true;
    }

    @Override
    public boolean updateTeacher(String teacherId, Teacher updateTeacher) {
        TeacherEntity teacherEntity = teacherRepository.findById(teacherId).get();

        teacherEntity.setTeacherName(updateTeacher.getTeacherName());
        teacherEntity.setTeacherEmail(updateTeacher.getTeacherEmail());
        teacherEntity.setTeacherPhone(updateTeacher.getTeacherPhone());
        teacherRepository.save(teacherEntity);
        return true;
    }

    @Override
    public Map<String, Object> getTeacherProfile(String username) {
        Optional<TeacherEntity> teacher = teacherRepository.findById(username);
        return Map.of();
    }


}
