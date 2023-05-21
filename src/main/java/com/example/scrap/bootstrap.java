package com.example.scrap;

import com.example.scrap.models.Questions;
import com.example.scrap.repos.QuestionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

//@Component
@RequiredArgsConstructor
public class bootstrap implements CommandLineRunner {
    private final QuestionRepo questionRepo;

    @Override
    public void run(String... args) throws Exception {
        List<String> options = new ArrayList<>();
        options.add("One");
        options.add("two");
        Questions questions = new Questions("What is your name?",options);
        questionRepo.save(questions);

    }
}
