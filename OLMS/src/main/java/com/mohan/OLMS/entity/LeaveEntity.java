package com.mohan.OLMS.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Leaves Table")
public class LeaveEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private Long leaveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student", referencedColumnName = "StudentId",nullable = false)
    private StudentEntity student;

    @Column(name = "leave_reason",nullable = false)
    private String leaveReason;

    @Column(name = "leave_status", nullable = false)
    private String leaveStatus;

    @Column(nullable = false)
    private String status = "Pending";



}
