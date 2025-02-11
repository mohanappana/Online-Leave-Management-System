package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveEntity,Long> {
    @Query("SELECT l FROM LeaveEntity l WHERE l.student.studentId = :studentId")
    List<LeaveEntity> findByStudentId(@Param("studentId") String studentId);

    // Count leaves by student and month
    @Query("SELECT COUNT(l) FROM LeaveEntity l WHERE l.student.studentId = :studentId AND FUNCTION('MONTH', l.fromDate) = :month AND FUNCTION('YEAR', l.fromDate) = :year")
    int countLeavesByMonth(
            @Param("studentId") String studentId,
            @Param("month") int month,
            @Param("year") int year
    );

    // Get leave data grouped by month for graphing
    @Query("SELECT FUNCTION('MONTH', l.fromDate) AS month, COUNT(l) AS count FROM LeaveEntity l WHERE l.student.studentId = :studentId GROUP BY FUNCTION('MONTH', l.fromDate)")
    List<Object[]> countLeavesGroupedByMonth(@Param("studentId") String studentId);

    @Query("SELECT COUNT(l) FROM LeaveEntity l " +
            "WHERE (MONTH(l.fromDate) = MONTH(CURRENT_DATE) " +
            "OR MONTH(l.toDate) = MONTH(CURRENT_DATE)) " +
            "AND YEAR(l.fromDate) = YEAR(CURRENT_DATE)")
    Integer countLeavesForCurrentMonth();

//    @Transactional
//    @Query("DELETE FROM LeaveEntity l WHERE l.student.studentId = :studentId")
//    boolean deleteLeaveByStudentId(String studentId);

    @Query("SELECT COUNT(l) FROM LeaveEntity l WHERE l.student.studentId = :studentId AND l.leaveStatus = :leaveStatus")
    Integer countLeavesInQueue(@Param("studentId") String studentId,@Param("leaveStatus") String leaveStatus);

    @Query(value = "SELECT " +
            "SUM(CASE WHEN l.leave_status = 'Rejected' THEN 1 ELSE 0 END) AS rejected, " +
            "SUM(CASE WHEN l.leave_status = 'Approved' THEN 1 ELSE 0 END) AS approved " +
            "FROM leave_entity l " +
            "JOIN student_entity s ON s.student_id = l.student " +
            "WHERE s.student_id = :studentId", nativeQuery = true)
    Map<String,Object> leavesDataOfGrantedAndRejectedOfStudent(@Param("studentId") String studentId);

    @Query(value = "SELECT " +
            "SUM(CASE WHEN l.leave_status = 'Rejected' THEN 1 ELSE 0 END) AS rejected, " +
            "SUM(CASE WHEN l.leave_status = 'Approved' THEN 1 ELSE 0 END) AS approved " +
            "FROM leave_entity l " +
            "WHERE l.leave_status IN ('Approved', 'Rejected') " +
            "AND l.granted_or_rejected_by = :userId",
            nativeQuery = true)
    Map<String,Object> countLeavesRejectedByHod(@Param("userId") String userId);

    Long countByLeaveStatus(String leaveStatus);





}
