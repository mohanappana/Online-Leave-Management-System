package com.mohan.OLMS.security.services;

import com.mohan.OLMS.entity.HodEntity;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.entity.TeacherEntity;
import com.mohan.OLMS.repository.HodRepository;
import com.mohan.OLMS.repository.StudentRepository;
import com.mohan.OLMS.repository.TeacherRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final HodRepository hodRepository;

    public UserDetailsServiceImpl(StudentRepository studentRepository, TeacherRepository teacherRepository, HodRepository hodRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.hodRepository = hodRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (studentRepository.existsById(username)) {
            StudentEntity student = studentRepository.findById(username).orElseThrow(
                    () -> new UsernameNotFoundException("Student not found")
            );
            return new UserDetailsImpl(student);
        } else if (teacherRepository.existsById(username)) {
            TeacherEntity teacher = teacherRepository.findById(username).orElseThrow(
                    () -> new UsernameNotFoundException("Teacher not found")
            );
            return new UserDetailsImpl(teacher);
        } else if (hodRepository.existsById(username)) {
            HodEntity hod = hodRepository.findById(username).orElseThrow(
                    () -> new UsernameNotFoundException("HOD not found")
            );
            return new UserDetailsImpl(hod);
        }
        throw new UsernameNotFoundException("User not found");
    }
}

