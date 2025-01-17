package com.mohan.OLMS.repository;

import com.mohan.OLMS.entity.HodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HodRepository extends JpaRepository<HodEntity,String> {
}
