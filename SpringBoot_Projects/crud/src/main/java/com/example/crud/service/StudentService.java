package com.example.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.crud.entity.Student;
import com.example.crud.repository.StudentRepository;

@Service
public class StudentService {

    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student createStudent(Student student) {
        Student createdStudent = studentRepository.save(student);
        return createdStudent;
    }

    public Student getStudent(Long id) {
        Optional<Student> student = studentRepository.findById(id);

        if(student.isPresent()) {
            return student.get();
        } else {
            return null; // or throw an exception, depending on your design choice
        }
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Optional<Student> existStudent = studentRepository.findById(id);

        if(existStudent.isEmpty()) {
            return null;
        }

        Student student = existStudent.get();
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        student.setAge(updatedStudent.getAge());
        student.setRollNo(updatedStudent.getRollNo());
        student.setSubject(updatedStudent.getSubject());

        return studentRepository.save(student);
    }

    public Boolean deleteStudent(Long id) {
        Boolean isStudent = studentRepository.existsById(id);

        if(!isStudent) return false;

        studentRepository.deleteById(id);
        return true;
    }
}
