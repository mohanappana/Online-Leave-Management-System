package com.mohan.OLMS.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LeaveEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private Long leaveId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student", referencedColumnName = "StudentId")
    private StudentEntity student;

    @Column(name = "leave_reason")
    private String leaveReason;

    @Column(name = "leave_status")
    private String leaveStatus;

    @Column(name = "from_Date")
    private Date fromDate;

    @Column(name = "to_Date")
    private Date ToDate;





}
