package com.mohan.OLMS.Dto;


import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LeaveDTO {
    private Long leaveId;


    private String studentId;


    private String leaveReason;


    private String leaveStatus;


    private Date fromDate;


    private Date ToDate;
}
