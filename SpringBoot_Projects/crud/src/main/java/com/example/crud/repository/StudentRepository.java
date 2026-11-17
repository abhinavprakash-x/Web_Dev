package com.example.crud.repository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.example.crud.entity.Student;

@Component 
public class StudentRepository {

    public ResponseEntity<Student> save(Student student) {
        System.out.println("Student saved: " + student.getName());
        System.out.println("Student email: " + student.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }
}