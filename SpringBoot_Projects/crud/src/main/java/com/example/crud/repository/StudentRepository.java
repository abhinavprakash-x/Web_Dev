package com.example.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crud.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository provides CRUD operations for the Student entity automatically
}