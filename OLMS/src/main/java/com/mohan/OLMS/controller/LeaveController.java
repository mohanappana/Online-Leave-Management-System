package com.mohan.OLMS.controller;

import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.services.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
        return ResponseEntity.ok(leaves);
    }
}
