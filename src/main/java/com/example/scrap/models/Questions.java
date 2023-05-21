package com.example.scrap.models;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
public class Questions {
    @Id
    public String id = UUID.randomUUID().toString();
    public String question;
    @ElementCollection
    public List<String> options;

    public Questions(String question, List<String> options) {
        this.question = question;
        this.options = options;
    }

    public Questions() {

    }
}
