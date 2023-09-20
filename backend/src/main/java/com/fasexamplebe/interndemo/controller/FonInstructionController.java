package com.fasexamplebe.interndemo.controller;

import com.fasexamplebe.interndemo.dto.CreateFonInstructionRequest;
import com.fasexamplebe.interndemo.dto.FonInstructionDto;
import com.fasexamplebe.interndemo.dto.FonInstructionFilterParameters;
import com.fasexamplebe.interndemo.dto.UpdateFonInstructionRequest;
import com.fasexamplebe.interndemo.exception.PueErrorException;
import com.fasexamplebe.interndemo.service.FonInstructionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("fon-instruction")
public class FonInstructionController {

    private final FonInstructionService fonInstructionService;

    public FonInstructionController(FonInstructionService fonInstructionService) {
        this.fonInstructionService = fonInstructionService;
    }

    @PostMapping("create")
    @PreAuthorize("hasAuthority('FON_EDIT')")
    public ResponseEntity<String> createFonInstruction(@RequestBody CreateFonInstructionRequest request) {
        try {
            return ResponseEntity.ok(fonInstructionService.createFonInstruction(request.fonId, request.operationType, request.count).toString());
        } catch (PueErrorException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("update")
    @PreAuthorize("hasAuthority('FON_EDIT')")
    public ResponseEntity<String> updateFonInstruction(@RequestBody UpdateFonInstructionRequest request) {
        try {
            fonInstructionService.updateInstruction(request.instructionId, request.count, request.price);
            return ResponseEntity.ok("");
        } catch (PueErrorException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("list")
    public List<FonInstructionDto> getInstructionList(@RequestBody FonInstructionFilterParameters parameters) {
        return fonInstructionService.getInstructionList(parameters);
    }

    @DeleteMapping("delete")
    @PreAuthorize("hasAuthority('FON_EDIT')")
    public void deleteInstruction(@RequestParam UUID instructionId) {
        fonInstructionService.deleteInstruction(instructionId);
    }
}
