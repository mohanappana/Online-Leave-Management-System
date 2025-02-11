package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;

import java.util.List;
import java.util.Map;

public interface LeaveService {
    public boolean applyForLeave(LeaveEntity leaveEntity);

    List<LeaveEntity> getLeaveDetailsById(String studentId);

    List<LeaveDTO> getAllLeaveDetails();

    Map<String,Integer> getLeaveDataforGraph(String studentId);


    Integer getDataforDoughnutChart(String studentId);


    List<Object> hodDashboadMethods();

    List<Map<String,Object>> teacherDetails(String userId);

    List<Map<String, Object>> hodDashboard();
}
