package com.fasexamplebe.interndemo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalTime;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class HomeController {
    @GetMapping("index")
    public String index() {
        return String.format("%s - %s", LocalDate.now(), LocalTime.now());
    }
}