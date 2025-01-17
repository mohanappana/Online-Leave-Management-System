package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.StudentDTO;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.entity.TeacherEntity;
import com.mohan.OLMS.model.Student;
import com.mohan.OLMS.repository.StudentRepository;
import com.mohan.OLMS.security.jwt.JwtUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpls implements StudentService{

    private final StudentRepository studentRepository;

    @Autowired
    private JwtUtils jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    public StudentServiceImpls(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);


    @Override
    public boolean addStudent(Student student) {
        if(student != null && student.getStudentId() != null){
            StudentEntity studentEntity = new StudentEntity();
            student.setStudentEmail(student.getStudentId()+"@rguktn.ac.in");
            String Pwd_first = student.getStudentId();
            String Pwd_Second = student.getStudentName();

            student.setStudentPassword(bCryptPasswordEncoder.encode((Pwd_first.substring(3)+"@"+Pwd_Second.substring(0,3))));
            BeanUtils.copyProperties(student,studentEntity);
            studentRepository.save(studentEntity);
            return true;

        }else{
            return false;
        }
    }

    @Override
    public List<Student> getAllStudents() {
        List<StudentEntity> studentEntities = studentRepository.findAll();

        List<Student> students = studentEntities
                .stream()
                .map(stu -> new Student(
                        stu.getStudentId(),
                        stu.getStudentName(),
                        stu.getStudentEmail(),
                        stu.getStudentPhone(),
                        null,
                        null,null))
                .collect(Collectors.toList());

        return students;
    }

    @Override
    public boolean deleteStudent(String studentId) {
        StudentEntity studentEntity = studentRepository.findById(studentId).get();
        studentRepository.delete(studentEntity);
        return true;
    }

    @Override
    public boolean updateStudent(String studentId, Student updateStudent) {
        StudentEntity studentEntity = studentRepository.findById(studentId).get();

        studentEntity.setStudentName(updateStudent.getStudentName());
        studentEntity.setStudentEmail(updateStudent.getStudentEmail());
        studentEntity.setStudentPhone(updateStudent.getStudentPhone());
        studentRepository.save(studentEntity);

        return true;
    }

    @Override
    public StudentDTO getStudentById(String studentId) {
        StudentEntity studentEntity = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: "+ studentId));
        StudentDTO studentDTO = new StudentDTO();
        BeanUtils.copyProperties(studentEntity,studentDTO);
        return studentDTO;
    }

    @Override
    public Map<String, Object> getStudentProfile(String username) {
        Optional<StudentEntity> student = studentRepository.findById(username);
        if(student.isPresent()){
            StudentEntity studentEntity = student.get();
            return Map.of(
                    "studentId",studentEntity.getStudentId(),
                    "studentName",studentEntity.getStudentName()


            );
        }else {
            throw new UsernameNotFoundException("Student not Found");
        }

    }


//
//    @Override
//    public String verify(StudentEntity studentEntity){
//        Authentication authentication =
//                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(studentEntity.getStudentId(), studentEntity.getStudentPassword()));
//        if(authentication.isAuthenticated()){
//            return jwtService.generateTokenFromUsername(studentEntity.getStudentId());
//        }else {
//            return "fail";
//        }
//    }

}

