package com.example.scrap.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class Student {
    @Id
    private String id = UUID.randomUUID().toString();
    private String StringName;
    private String ContactNumber;
    private String MailID;
}
