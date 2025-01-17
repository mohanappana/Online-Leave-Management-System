    package com.mohan.OLMS.Dto;

    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class StudentDTO {
        private String studentId;
        private String studentName;
        private String studentEmail;
        private Long studentPhone;
    }
