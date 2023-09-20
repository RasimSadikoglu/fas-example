package com.fasexamplebe.interndemo.controller;

import com.fasexamplebe.interndemo.dto.FonDto;
import com.fasexamplebe.interndemo.service.FonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("fon")
public class FonController {
    private final FonService fonService;

    public FonController(FonService fonService) {
        this.fonService = fonService;
    }

    @PostMapping("insert-bulk")
    public void insertFonsBulk(@RequestBody List<FonDto> fons) {
        fonService.insertFonsBulk(fons);
    }

    @GetMapping("fon-code")
    public List<String> getAvailableFonCodes() {
        return fonService.getAvailableFonCodes();
    }

    @GetMapping("to-member-code")
    public List<String> getAvailableToMemberCodes(@RequestParam String fonCode) {
        return fonService.getAvailableToMemberCodes(fonCode);
    }

    @GetMapping("currency")
    public List<String> getAvailableCurrencies(@RequestParam String fonCode, @RequestParam String toMemberCode) {
        return fonService.getAvailableCurrencies(fonCode, toMemberCode);
    }

    @GetMapping()
    public Optional<FonDto> getFon(@RequestParam String fonCode, @RequestParam String toMemberCode, @RequestParam String currency) {
        return fonService.getFon(fonCode, toMemberCode, currency);
    }

    @GetMapping("to-member-code-all")
    public List<String> getAllToMemberCodes() {
        return fonService.getAllToMemberCodes();
    }
}
