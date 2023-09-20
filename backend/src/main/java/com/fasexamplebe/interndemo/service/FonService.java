package com.fasexamplebe.interndemo.service;

import com.fasexamplebe.interndemo.dto.FonDto;
import com.fasexamplebe.interndemo.map.MapFonDtoToFon;
import com.fasexamplebe.interndemo.map.MapFonToFonDto;
import com.fasexamplebe.interndemo.repository.FonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FonService {

    private final FonRepository fonRepository;

    public FonService(FonRepository fonRepository) {
        this.fonRepository = fonRepository;
    }

    public void insertFonsBulk(List<FonDto> fons) {
        fonRepository.saveAll(fons
                .stream()
                .map(MapFonDtoToFon::map)
                .collect(Collectors.toList()));
    }

    public List<String> getAvailableFonCodes() {
        return fonRepository.findDistinctFonCodes();
    }

    public List<String> getAvailableToMemberCodes(String fonCode) {
        return fonRepository.findDistinctToMemberCodes(fonCode);
    }

    public List<String> getAvailableCurrencies(String fonCode, String toMemberCode) {
        return fonRepository.findDistinctCurrencies(fonCode, toMemberCode);
    }

    public Optional<FonDto> getFon(String fonCode, String toMemberCode, String currency) {
        return fonRepository
                .findFonByCodeAndToMemberCodeAndCurrency(fonCode, toMemberCode, currency)
                .map(MapFonToFonDto::map);
    }

    public List<String> getAllToMemberCodes() {
        return fonRepository.getAllToMemberCodes();
    }
}
