package com.fasexamplebe.interndemo.service;

import com.fasexamplebe.interndemo.common.OperationTypeEnum;
import com.fasexamplebe.interndemo.dto.FonInstructionDto;
import com.fasexamplebe.interndemo.dto.FonInstructionFilterParameters;
import com.fasexamplebe.interndemo.exception.PueErrorException;
import com.fasexamplebe.interndemo.map.MapFonInstructionToFonInstructionDto;
import com.fasexamplebe.interndemo.model.Fon;
import com.fasexamplebe.interndemo.model.FonInstruction;
import com.fasexamplebe.interndemo.repository.FonInstructionRepository;
import com.fasexamplebe.interndemo.repository.FonRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FonInstructionService {

    private final FonRepository fonRepository;
    private final FonInstructionRepository fonInstructionRepository;

    public FonInstructionService(FonRepository fonRepository, FonInstructionRepository fonInstructionRepository) {
        this.fonRepository = fonRepository;
        this.fonInstructionRepository = fonInstructionRepository;
    }

    public UUID createFonInstruction(UUID fonId, OperationTypeEnum operationType, float count) throws PueErrorException {
        Optional<Fon> fonOptional = fonRepository.findById(fonId);
        Fon fon = fonOptional.orElseThrow(() -> new PueErrorException("Fon is not found"));

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        FonInstruction instruction = new FonInstruction();
        instruction.setMemberCode(userDetails.getUsername());
        instruction.setFonCode(fon.getCode());
        instruction.setToMemberCode(fon.getToMemberCode());
        instruction.setCurrency(fon.getCurrency());
        instruction.setInstructionDate(LocalDate.now());
        instruction.setValorDate(LocalDate.now().plusDays(fon.getValorSuspension()));
        instruction.setCount(count);
        instruction.setPrice(count * fon.getPrice());
        instruction.setOperationType(operationType);

        instruction = fonInstructionRepository.save(instruction);
        return instruction.getId();
    }

    public List<FonInstructionDto> getInstructionList(FonInstructionFilterParameters parameters) {
        Stream<FonInstructionDto> fonInstructions = fonInstructionRepository
                .findAll()
                .stream()
                .map(MapFonInstructionToFonInstructionDto::map);

        if (parameters.getInstructionId() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    x.getInstructionId().equals(parameters.getInstructionId()));
        }

        if (parameters.getFonCode() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    x.getFonCode().equals(parameters.getFonCode()));
        }

        if (parameters.getToMemberCode() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    x.getToMemberCode().equals(parameters.getToMemberCode()));
        }

        if (parameters.getCurrency() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    x.getCurrency().equals(parameters.getCurrency()));
        }

        if (parameters.getOperationType() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    x.getOperationType() == parameters.getOperationType());
        }

        if (parameters.getInstructionStartDate() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    !x.getInstructionDate().isBefore(parameters.getInstructionStartDate()));
        }

        if (parameters.getInstructionEndDate() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    !x.getInstructionDate().isAfter(parameters.getInstructionEndDate()));
        }

        if (parameters.getValorStartDate() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    !x.getInstructionDate().isBefore(parameters.getValorStartDate()));
        }

        if (parameters.getValorEndDate() != null) {
            fonInstructions = fonInstructions.filter(x ->
                    !x.getInstructionDate().isAfter(parameters.getValorEndDate()));
        }

        return fonInstructions.collect(Collectors.toList());
    }

    public void deleteInstruction(UUID instructionId) {
        fonInstructionRepository.deleteById(instructionId);
    }

    public void updateInstruction(UUID instructionId, float count, float price) throws PueErrorException {
        FonInstruction fonInstruction = fonInstructionRepository
                .findById(instructionId)
                .orElseThrow(() -> new PueErrorException("Fon is not found!"));

        fonInstruction.setCount(count);
        fonInstruction.setPrice(price);

        fonInstructionRepository.save(fonInstruction);
    }
}
