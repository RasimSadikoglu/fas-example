package com.fasexamplebe.interndemo.dto;

import com.fasexamplebe.interndemo.common.OperationTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FonInstructionFilterParameters {
    private UUID instructionId;
    private String fonCode;
    private String toMemberCode;
    private String currency;
    private OperationTypeEnum operationType;
    private LocalDate instructionStartDate;
    private LocalDate instructionEndDate;
    private LocalDate valorStartDate;
    private LocalDate valorEndDate;
}
