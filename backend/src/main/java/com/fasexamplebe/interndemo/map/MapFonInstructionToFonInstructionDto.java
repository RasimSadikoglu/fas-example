package com.fasexamplebe.interndemo.map;

import com.fasexamplebe.interndemo.dto.FonInstructionDto;
import com.fasexamplebe.interndemo.model.FonInstruction;

public class MapFonInstructionToFonInstructionDto {

    public static FonInstructionDto map(FonInstruction fonInstruction) {
        FonInstructionDto fonInstructionDto = new FonInstructionDto();

        fonInstructionDto.setInstructionId(fonInstruction.getId());
        fonInstructionDto.setMemberCode(fonInstruction.getMemberCode());
        fonInstructionDto.setFonCode(fonInstruction.getFonCode());
        fonInstructionDto.setToMemberCode(fonInstruction.getToMemberCode());
        fonInstructionDto.setCurrency(fonInstruction.getCurrency());
        fonInstructionDto.setInstructionDate(fonInstruction.getInstructionDate());
        fonInstructionDto.setValorDate(fonInstruction.getValorDate());
        fonInstructionDto.setCount(fonInstruction.getCount());
        fonInstructionDto.setPrice(fonInstruction.getPrice());
        fonInstructionDto.setOperationType(fonInstruction.getOperationType());

        return fonInstructionDto;
    }
}
