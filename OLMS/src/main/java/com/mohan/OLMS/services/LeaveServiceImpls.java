package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<LeaveDTO> getAllLeaveDetails() {
        return leaveRepository.findAll()
                .stream()
                .map(LeaveDetails -> new LeaveDTO(
                        LeaveDetails.getLeaveId(),
                        LeaveDetails.getStudent().getStudentId(),
                        LeaveDetails.getLeaveReason(),
                        LeaveDetails.getLeaveStatus(),
                        LeaveDetails.getFromDate(),
                        LeaveDetails.getToDate()
                        ))
                .collect(Collectors.toList());
    }
}
