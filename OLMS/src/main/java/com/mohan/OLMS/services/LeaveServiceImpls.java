package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import com.mohan.OLMS.repository.StudentRepository;
import com.mohan.OLMS.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LeaveServiceImpls implements LeaveService{

    private LeaveRepository leaveRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;



    public LeaveServiceImpls(LeaveRepository leaveRepository){
        this.leaveRepository = leaveRepository;
    }

    @Override
    public boolean applyForLeave(LeaveEntity leaveEntity) {
        if (leaveEntity == null || leaveEntity.getStudent() == null) {
            throw new IllegalArgumentException("LeaveEntity or associated StudentEntity is null.");
        }

        // Fetch student entity from the database
        String studentId = leaveEntity.getStudent().getStudentId();
//        if(leaveEntity.getFromDate().toInstant().isAfter(leaveEntity.getToDate())){
//
//        }
        StudentEntity student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + studentId));

        // Attach the fetched student entity to leaveEntity
        leaveEntity.setStudent(student);

        // Extract month and year from fromDate
        int month = leaveEntity.getFromDate().getMonthValue();
        int year = leaveEntity.getFromDate().getYear();

        // Check if the student has already applied for the maximum allowed leaves
        int leaveCount = leaveRepository.countLeavesByMonth(student.getStudentId(), month, year);
        if (leaveCount >= 3) {
            throw new IllegalArgumentException("Maximum 3 leaves are allowed per month.");
        }

        // Save the leave entity
        leaveRepository.save(leaveEntity);
        return true;
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

    @Override
    public Map<String, Integer> getLeaveDataforGraph(String studentId) {
        List<Object[]> results = leaveRepository.countLeavesGroupedByMonth(studentId);

        // Map to store month names and counts
        Map<String, Integer> leaveCountsByMonth = new HashMap<>();

        for (Object[] row : results) {
            Integer monthNumber = (Integer) row[0]; // Extract numeric month
            Long longCount = (Long) row[1]; // Extract leave count

            Integer count = longCount.intValue();

            // Convert numeric month to month name (e.g., 1 -> "Jan")
            String monthName = Month.of(monthNumber).name().substring(0, 3).toUpperCase(); // Example: "JAN"
            leaveCountsByMonth.put(monthName, count);
        }
        return leaveCountsByMonth;
    }

    @Override
    public Integer getDataforDoughnutChart(String studentId) {

        return leaveRepository.countLeavesForCurrentMonth();
    }

    @Override
    public List<Object> hodDashboadMethods() {
        Long allPendingLeaves = leaveRepository.countByLeaveStatus("Pending");

        return List.of();
    }

    @Override
    public List<Map<String,Object>> teacherDetails(String  userId) {
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> mapReadOnly = leaveRepository.countLeavesRejectedByHod(userId);
        Map<String,Object> map = new HashMap<>(mapReadOnly);
        Long pendingLeaves = leaveRepository.countByLeaveStatus("Pending");
        map.put("pending",pendingLeaves);
        list.add(map);
        return list;
    }

    @Override
    public List<Map<String, Object>> hodDashboard() {
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> mapReadOnly = leaveRepository.countLeavesRejectedByHod("admin");
        Map<String,Object> map = new HashMap<>(mapReadOnly);
        Long pendingLeaves = leaveRepository.countByLeaveStatus("Pending");
        map.put("pending",pendingLeaves);
        Long students = studentRepository.count();
        Long teachers = teacherRepository.count();
        map.put("students",students);
        map.put("teachers",teachers);
        list.add(map);
        return list;
    }


}
