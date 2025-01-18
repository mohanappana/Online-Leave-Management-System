package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LeaveRepository extends JpaRepository<LeaveEntity,Long> {
    @Query("SELECT l FROM LeaveEntity l WHERE l.student.studentId = :studentId")
    List<LeaveEntity> findByStudentId(@Param("studentId") String studentId);
}
