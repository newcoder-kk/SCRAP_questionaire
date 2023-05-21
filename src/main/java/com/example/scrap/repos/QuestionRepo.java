package com.example.scrap.repos;


import com.example.scrap.models.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Questions, String> {
}
