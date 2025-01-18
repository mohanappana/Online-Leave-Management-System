package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface LeaveService {
    public boolean applyForLeave(LeaveEntity leaveEntity);

    List<LeaveEntity> getLeaveDetailsById(String studentId);
}
