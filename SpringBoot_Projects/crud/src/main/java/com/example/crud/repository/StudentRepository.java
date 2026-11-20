package com.example.crud.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crud.entity.Student;

//@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository provides CRUD operations for the Student entity automatically

    Optional<Student> findByIdAndDeletedIsFalse(Long id);
    List<Student> findByDeletedIsFalse();
}