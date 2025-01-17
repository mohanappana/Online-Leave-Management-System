package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity,String> {
    Optional<TeacherEntity> findByTeacherId(String teacherId);
}
