package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LeaveServiceImpls implements LeaveService{

    private LeaveRepository leaveRepository;

    public LeaveServiceImpls(LeaveRepository leaveRepository){
        this.leaveRepository = leaveRepository;
    }

    @Override
    public boolean applyForLeave(LeaveEntity leaveEntity) {
        if(true)
            return true;
        else
            return false;
    }
}
