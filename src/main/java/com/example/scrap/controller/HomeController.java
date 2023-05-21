package com.example.scrap.controller;

import com.example.scrap.repos.QuestionRepo;
import com.example.scrap.repos.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class HomeController {
    public final QuestionRepo questionRepo;
    public final StudentRepo studentRepo;
    @GetMapping("/")
    public String get_index(Model model){
        model.addAttribute("questions", questionRepo.findAll());
        return "index";
    }
    @PostMapping("/")
    public String post_index(Model model){
        return "redirect:get_index";
    }
}
