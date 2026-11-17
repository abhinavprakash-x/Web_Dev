package com.example.crud.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.crud.entity.Student;
import com.example.crud.repository.StudentRepository;

@Service
public class StudentService {

    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public ResponseEntity<Student> createStudent(Student student) {
        ResponseEntity<Student> createdStudent = studentRepository.save(student);
        return createdStudent;
    }
}
