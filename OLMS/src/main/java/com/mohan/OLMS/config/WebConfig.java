//package com.mohan.OLMS.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**") // Allow all endpoints
//                .allowedOrigins("http://localhost:5173") // Allow your frontend's origin
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow necessary methods
//                .allowedHeaders("*") // Allow all headers
//                .allowCredentials(true); // Allow cookies and credentials if needed
//    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//        // Define CORS Configuration
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedOrigin("http://localhost:5173"); // Allow your frontend's origin
//        configuration.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, etc.)
//        configuration.addAllowedHeader("*"); // Allow all headers
//        configuration.setAllowCredentials(true); // Allow cookies and credentials
//
//        // Apply the configuration to all endpoints
//        source.registerCorsConfiguration("/**", configuration);
//
//        return new CorsFilter(source);
//    }
//}
