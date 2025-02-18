package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.List;
import java.util.Map;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveEntity,Long> {
    @Query("SELECT l FROM LeaveEntity l WHERE l.student.studentId = :studentId")
    List<LeaveEntity> findByStudentId(@Param("studentId") String studentId);

    // Count leaves by student and month
    @Query("SELECT COUNT(l) FROM LeaveEntity l WHERE l.student.studentId = :studentId AND FUNCTION('MONTH', l.fromDate) = :month AND FUNCTION('YEAR', l.fromDate) = :year AND l.leaveStatus = :leaveStatus")
    Integer countLeavesByMonthAndStatus(
            @Param("studentId") String studentId,
            @Param("month") int month,
            @Param("year") int year,
            @Param("leaveStatus") String leaveStatus
    );


    @Query(value = """
    SELECT ELT(m.month, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec') AS month_name, 
           COALESCE(COUNT(l.leave_id), 0) AS count
    FROM (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 
          UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 
          UNION SELECT 11 UNION SELECT 12) AS m
    LEFT JOIN leave_entity l 
        ON MONTH(l.from_date) = m.month 
        AND l.student = :studentId 
        AND l.leave_status = 'APPROVED' 
        AND YEAR(l.from_date) = :year
        AND (MONTH(l.from_date) <= MONTH(CURRENT_DATE) AND YEAR(l.from_date) = :year)
    GROUP BY m.month
    ORDER BY m.month
""", nativeQuery = true)
    List<Object[]> countLeavesGroupedByMonth(@Param("studentId") String studentId, @Param("year") Year year);



    @Query("SELECT COUNT(l) FROM LeaveEntity l " +
            "WHERE (MONTH(l.fromDate) = MONTH(CURRENT_DATE) " +
            "OR MONTH(l.toDate) = MONTH(CURRENT_DATE)) " +
            "AND YEAR(l.fromDate) = YEAR(CURRENT_DATE) " +
            "AND l.leaveStatus = 'Approved'"+
            "AND l.student.studentId = :studentId"
    )
    Integer countLeavesForCurrentMonth(@Param("studentId") String studentId);


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
