    package com.mohan.OLMS.repository;

    import com.mohan.OLMS.entity.StudentEntity;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface StudentRepository extends JpaRepository<StudentEntity,String> {
        long count();

    }
