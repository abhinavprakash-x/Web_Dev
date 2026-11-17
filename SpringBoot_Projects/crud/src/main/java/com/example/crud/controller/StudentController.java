package com.example.crud.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.entity.Student;
import com.example.crud.service.StudentService;

@RestController 
@RequestMapping ("/api/students")
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // create student -> POST /api/students
    @PostMapping 
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        ResponseEntity<Student> createdStudent = studentService.createStudent(student);
        return createdStudent;
    }

    // read student -> GET /api/students/{id}
    public void readStudent() {
    }

    // read all students -> GET /api/students
    public void readAllStudents() {
    }

    // update student -> PUT /api/students/{id}
    public void updateStudent() {  
    }
    // delete student -> DELETE /api/students/{id}
    public void deleteStudent() {
    }
}