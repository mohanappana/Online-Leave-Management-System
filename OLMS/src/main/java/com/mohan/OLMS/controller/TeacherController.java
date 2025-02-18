package com.mohan.OLMS.controller;

import com.mohan.OLMS.Dto.TeacherDTO;
import com.mohan.OLMS.model.Teacher;
import com.mohan.OLMS.services.TeacherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.status;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService){
        this.teacherService = teacherService;
    }

    @PostMapping("/teacher")
    public ResponseEntity<String> addTeacher(@RequestBody Teacher teacher){
        boolean isTeacherAdded = teacherService.addTeacher(teacher);
        if(isTeacherAdded){
            return new ResponseEntity<>("Teacher data is Added Successfully", HttpStatus.OK);
        }
        else{
            return  new ResponseEntity<>("Teacher data is Not Added",HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/profile")
    public ResponseEntity<?> getTeacherProfile(Authentication authentication ){
        if(authentication != null){
            String username = authentication.getName();
            Map<String,Object> profile = teacherService.getTeacherProfile(username);
            return ResponseEntity.ok(profile);
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Teacher not authenticated");

    }
    @GetMapping("/teacher")
    public List<TeacherDTO> getAllTeachers(){
        return teacherService.getAllTeachers()
                .stream()
                .map(teach -> new TeacherDTO(
                        teach.getTeacherId(),
                        teach.getTeacherName(),
                        teach.getTeacherEmail(),
                        teach.getTeacherPhone()))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/teacher/{teacherId}")
    public ResponseEntity<HashMap<String,Boolean>> deteleTeacher(@PathVariable String teacherId){
        boolean deleted = false;
        deleted = teacherService.deleteTeacher(teacherId);
        HashMap<String,Boolean> response =new HashMap<>();
        response.put("deleted",deleted);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/teacher/{teacherId}")
    public ResponseEntity<String> updateTeacher(@PathVariable String teacherId,@RequestBody Teacher updateTeacher){
        boolean isTeacherUpdated = teacherService.updateTeacher(teacherId,updateTeacher);
        if(isTeacherUpdated){
            return new ResponseEntity<>("Teacher data updated",HttpStatus.OK);
        }
        else {
            return  new ResponseEntity<>("Teacher data not updated",HttpStatus.OK);
        }
    }

}
