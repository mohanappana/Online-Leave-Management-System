package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.http.ResponseEntity;

public interface LeaveService {
    public boolean applyForLeave(LeaveEntity leaveEntity);
}
