package com.mohan.OLMS.controller;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import com.mohan.OLMS.repository.StudentRepository;
import com.mohan.OLMS.repository.TeacherRepository;
import com.mohan.OLMS.services.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/leave")
public class LeaveController {

    private LeaveService leaveService;

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    public LeaveController(LeaveService leaveService){
        this.leaveService = leaveService;
    }
    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @PostMapping("/applyLeave")
    public ResponseEntity<?> applyLeave(@RequestBody LeaveEntity leaveEntity){

        if (leaveEntity == null) {
            return ResponseEntity.badRequest().body("LeaveEntity is null");
        }

        System.out.println("LeaveEntity: " + leaveEntity);
        System.out.println("Student in LeaveEntity: " + leaveEntity.getStudent());
        System.out.println("Student ID: " + (leaveEntity.getStudent() != null ? leaveEntity.getStudent().getStudentId() : "null"));

        try {
            leaveService.applyForLeave(leaveEntity);
            return ResponseEntity.ok("Leave applied successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<LeaveEntity>> leaveDetailsById(@PathVariable String studentId){
        List<LeaveEntity> leaves = leaveService.getLeaveDetailsById(studentId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_HOD','ROLE_TEACHER')")
    @GetMapping("/leaveDetails")
    public ResponseEntity<List<LeaveDTO>> getAllLeaveDetails(){
        List<LeaveDTO> leaveDTOS = leaveService.getAllLeaveDetails()
                .stream()
                .filter(leave -> leave.getLeaveStatus().equalsIgnoreCase("pending"))
                .map(leave -> new LeaveDTO(
                        leave.getLeaveId(),
                        leave.getStudentId(),
                        leave.getLeaveReason(),
                        leave.getLeaveStatus(),
                        leave.getFromDate(),
                        leave.getToDate()
                ))
                .toList();
        return new ResponseEntity<>(leaveDTOS,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLeaveById(@PathVariable Long id){
        if (leaveRepository.existsById(id)) {
            leaveRepository.deleteById(id); // Perform deletion
            return ResponseEntity.ok("Leave record deleted successfully");
        }
        return new ResponseEntity<>("Leave record not found with ID: " + id,HttpStatus.NOT_FOUND);

    }

    @PreAuthorize("hasAnyRole('ROLE_HOD','ROLE_TEACHER')")
    @PatchMapping("/patch/{id}")
    public ResponseEntity<?> changeLeaveStatus(@PathVariable Long id, @RequestBody Map<String, String> requestBody){
        Optional<LeaveEntity> leaveEntity = leaveRepository.findById(id);
        if(leaveEntity.isPresent()){
            LeaveEntity leave = leaveEntity.get();
            String leaveStatus = requestBody.get("leaveStatus");
            leave.setLeaveStatus(leaveStatus);
            leaveRepository.save(leave);
            return new ResponseEntity<>("Leave status updated",HttpStatus.OK);
        }
        return new ResponseEntity<>("Leave not found",HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/graph/{studentId}")
    public ResponseEntity<?> getLeaveDataforGraph(@PathVariable String studentId){
        Map<String,Integer> results = leaveService.getLeaveDataforGraph(studentId);
        return new ResponseEntity<>(results,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/doughnut/{studentId}")
    public ResponseEntity<?> getDataforDoughnut(@PathVariable String studentId){
        Integer count = leaveService.getDataforDoughnutChart(studentId);
        return new ResponseEntity<>(count,HttpStatus.OK);
    }


    @GetMapping("/queueLeaves/{studentId}")
    public ResponseEntity<?> getDataofQueueLeaves(@PathVariable String studentId){
        Integer queueCount = leaveRepository.countLeavesInQueue(studentId,"Pending");
        return new ResponseEntity<>(queueCount,HttpStatus.OK);
    }


    @GetMapping("/rejectandapproved/{studentId}")
    public ResponseEntity<?> getda(@PathVariable String studentId){
        Map<String,Object> h = leaveRepository.leavesDataOfGrantedAndRejectedOfStudent(studentId);
        return new ResponseEntity<>(h,HttpStatus.OK);
    }
    @GetMapping("/hodDashboard")
    public ResponseEntity<?> lea(){
        List<Object> le = leaveService.hodDashboadMethods();
        return new ResponseEntity<>(leaveRepository.countByLeaveStatus("pending"),HttpStatus.OK);
    }

    @GetMapping("/re")
    public Map<String,Object> re( ){
        return leaveRepository.countLeavesRejectedByHod("N180161");
    }

    @PreAuthorize("hasRole('ROLE_TEACHER')")
    @GetMapping("/teacherDashboardDetails/{userId}")
    public List<Map<String,Object>> teacherDetails(@PathVariable String userId){
        List<Map<String,Object>> details = leaveService.teacherDetails(userId);
        return details;
    }

    @PreAuthorize("hasRole('ROLE_HOD')")
    @GetMapping("/hodDashboardDetails")
    public List<Map<String,Object>> dashboard(){
        return leaveService.hodDashboard();
    }

    @GetMapping("/stud")
    public Long stud(){

        return teacherRepository.count();
    }

}
