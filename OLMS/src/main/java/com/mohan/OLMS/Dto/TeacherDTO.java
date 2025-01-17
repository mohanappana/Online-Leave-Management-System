    package com.mohan.OLMS.Dto;

    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class TeacherDTO {
        private String teacherId;
        private String teacherName;
        private String teacherEmail;
        private Long teacherPhone;
    }
