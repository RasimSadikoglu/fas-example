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
public class FonInstructionDto {
    private UUID instructionId;
    private String memberCode;
    private String fonCode;
    private String toMemberCode;
    private String currency;
    private LocalDate instructionDate;
    private LocalDate valorDate;
    private float count;
    private float price;
    private OperationTypeEnum operationType;
}
