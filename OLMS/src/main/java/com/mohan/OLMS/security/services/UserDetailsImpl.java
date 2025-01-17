package com.mohan.OLMS.security.services;

import com.mohan.OLMS.entity.HodEntity;
import com.mohan.OLMS.entity.RoleEntity;
import com.mohan.OLMS.entity.StudentEntity;
import com.mohan.OLMS.entity.TeacherEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private String username;
    private String password;
    private String role;


    public UserDetailsImpl(Object entity){
        if(entity instanceof StudentEntity){
            StudentEntity student = (StudentEntity) entity;
            this.username = student.getStudentId();
            this.password = student.getStudentPassword();
            this.role = student.getRole().getRoleName();
        } else if (entity instanceof TeacherEntity) {
            TeacherEntity teacher = (TeacherEntity) entity;
            this.username = teacher.getTeacherId();
            this.password = teacher.getTeacherPassword();
            this.role = teacher.getRole().getRoleName();

        } else if (entity instanceof HodEntity) {
            HodEntity hod = (HodEntity) entity;
            this.username = hod.getHodId();
            this.password = hod.getHodPassword();
            this.role = hod.getRole().getRoleName();

        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(new SimpleGrantedAuthority("ROLE_"+ role));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
