package com.mohan.OLMS.controller;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.services.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    private LeaveService leaveService;

    public LeaveController(LeaveService leaveService){
        this.leaveService = leaveService;
    }
    @PostMapping("/applyLeave")
    public boolean applyLeave(@RequestBody LeaveEntity leaveEntity){

        return leaveService.applyForLeave(leaveEntity);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<LeaveEntity>> leaveDetailsById(@PathVariable String studentId){
        List<LeaveEntity> leaves = leaveService.getLeaveDetailsById(studentId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }

    @GetMapping("/leaveDetails")
    public ResponseEntity<List<LeaveDTO>> getAllLeaveDetails(){
        List<LeaveDTO> leaveDTOS = leaveService.getAllLeaveDetails()
                .stream()
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
}
