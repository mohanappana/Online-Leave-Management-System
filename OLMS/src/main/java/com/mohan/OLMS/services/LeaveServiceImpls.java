package com.mohan.OLMS.services;

import com.mohan.OLMS.Dto.LeaveDTO;
import com.mohan.OLMS.entity.LeaveEntity;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.repository.LeaveRepository;
import com.mohan.OLMS.repository.StudentRepository;
import com.mohan.OLMS.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.ZoneId;
import java.util.*;
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
        int leaveCount = leaveRepository.countLeavesByMonthAndStatus(student.getStudentId(), month, year,"Approved");
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
        Year year = Year.now();

        List<Object[]> results = leaveRepository.countLeavesGroupedByMonth(studentId, year);

        // Map to store month names and counts
        Map<String, Integer> leaveCountsByMonth = new LinkedHashMap<>();

        // Define the months in chronological order
        List<String> months = Arrays.asList("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

        int currentMonth = LocalDate.now().getMonthValue(); // January = 1, February = 2, ..., December = 12

        // Initialize the map with all months set to 0, but up to the current month
        for (int i = 0; i < currentMonth; i++) {
            leaveCountsByMonth.put(months.get(i), 0); // Set previous months to 0
        }

        // Populate the map with the actual leave counts from the query results
        for (Object[] row : results) {
            String month = (String) row[0];
            Long longCount = (Long) row[1]; // Extract leave count
            Integer count = longCount.intValue();

            // Update the map with the correct count for the month
            leaveCountsByMonth.put(month, count);
        }

        // Optionally, print the map to check the output
        for (Map.Entry<String, Integer> entry : leaveCountsByMonth.entrySet()) {
            System.out.println("Month: " + entry.getKey() + " count: " + entry.getValue());
        }

        return leaveCountsByMonth;
    }


    @Override
    public Integer getDataforDoughnutChart(String studentId) {

        return leaveRepository.countLeavesForCurrentMonth(studentId);
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
