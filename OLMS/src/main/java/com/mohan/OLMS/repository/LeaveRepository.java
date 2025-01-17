package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.LeaveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LeaveRepository extends JpaRepository<LeaveEntity,Long> {

}
