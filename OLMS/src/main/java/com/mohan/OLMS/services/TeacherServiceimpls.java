package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.RoleEntity;
import com.mohan.OLMS.entity.TeacherEntity;
import com.mohan.OLMS.model.Teacher;
import com.mohan.OLMS.repository.RoleRepository;
import com.mohan.OLMS.repository.TeacherRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherServiceimpls implements TeacherService{
    private final TeacherRepository teacherRepository;

    @Autowired
    private RoleRepository roleRepository;

    public TeacherServiceimpls(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Override
    public boolean addTeacher(Teacher teacher) {
        if( teacher != null && teacher.getTeacherId() != null){
            TeacherEntity teacherEntity = new TeacherEntity();
            teacher.setTeacherPassword(bCryptPasswordEncoder.encode(teacher.getTeacherId().substring(3)+"$"+teacher.getTeacherName().substring(0,4)));
            RoleEntity roleEntity = roleRepository.findById(2L)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            teacherEntity.setRole(roleEntity);
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
