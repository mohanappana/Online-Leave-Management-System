package com.mohan.OLMS.services;

import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpls implements LeaveService{

    private LeaveRepository leaveRepository;

    public LeaveServiceImpls(LeaveRepository leaveRepository){
        this.leaveRepository = leaveRepository;
    }

    @Override
    public boolean applyForLeave(LeaveEntity leaveEntity) {
        if(leaveEntity != null) {
            leaveRepository.save(leaveEntity);
            return true;

        }else{
            return false;
        }
    }

    @Override
    public List<LeaveEntity> getLeaveDetailsById(String studentId) {
        return leaveRepository.findByStudentId(studentId);
    }
}
