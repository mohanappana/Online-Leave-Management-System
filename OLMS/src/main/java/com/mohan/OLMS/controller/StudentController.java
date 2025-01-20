package com.mohan.OLMS.controller;

import com.mohan.OLMS.Dto.StudentDTO;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.model.Student;
import com.mohan.OLMS.services.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired


    private final StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/hello")
    public String hello(HttpServletRequest request){
        return "welocme"+ request.getSession().getId();
    }

    @GetMapping("/csrf")
    public CsrfToken getCsrfToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getStudentProfile(Authentication authentication) {
        if (authentication != null) {
            String username = authentication.getName(); // Extracted from JWT
            Map<String, Object> profile = studentService.getStudentProfile(username);
            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Student not authenticated");
    }
    @PostMapping("/student")
    public ResponseEntity<String> addStudent(@RequestBody Student student){
        boolean isStudentAdded = studentService.addStudent(student);
        if(isStudentAdded){
            return new ResponseEntity<>("hello", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("not added",HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_HOD','ROLE_TEACHER')")
    @GetMapping("/student")
    public List<StudentDTO> getAllStudents(){
        return studentService.getAllStudents()
                .stream()
                .map(stud -> new StudentDTO(
                        stud.getStudentId(),
                        stud.getStudentName(),
                        stud.getStudentEmail(),
                        stud.getStudentPhone()))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/student/{studentId}")
    public StudentDTO studentDetails(@PathVariable String studentId){
        return studentService.getStudentById(studentId);
    }

    @PreAuthorize("hasAnyRole('ROLE_HOD','ROLE_TEACHER')")
    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<String> deleteStudent(@PathVariable String studentId){
        boolean deleted = false;
        deleted = studentService.deleteStudent(studentId);
        if(deleted){
            return new ResponseEntity<>("Student data deleted",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Student data not deleted",HttpStatus.OK);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_HOD','ROLE_TEACHER')")
    @PutMapping("/student/{studentId}")
    public ResponseEntity<String> updateStudent(@PathVariable String studentId,@RequestBody Student updateStudent){
        boolean isStudentUpdated = studentService.updateStudent(studentId,updateStudent);
        if(isStudentUpdated){
            return new ResponseEntity<>("Updated successfully",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("not Updated",HttpStatus.BAD_REQUEST);
        }
    }




    @GetMapping("/student/login")
    public String login(){
        return "d";
    }

//    @PostMapping("/login")
//    public String login(@RequestBody StudentEntity studentEntity){
//        return studentService.verify(studentEntity);
//    }


}
