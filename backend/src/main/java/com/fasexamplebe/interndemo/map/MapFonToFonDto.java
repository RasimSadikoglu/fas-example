package com.fasexamplebe.interndemo.map;

import com.fasexamplebe.interndemo.dto.FonDto;
import com.fasexamplebe.interndemo.model.Fon;

public class MapFonToFonDto {
    public static FonDto map(Fon fon) {
        FonDto fonDto = new FonDto();

        fonDto.setId(fon.getId());
        fonDto.setCode(fon.getCode());
        fonDto.setExplanation(fon.getExplanation());
        fonDto.setToMemberCode(fon.getToMemberCode());
        fonDto.setToMemberExplanation(fon.getToMemberExplanation());
        fonDto.setCurrency(fon.getCurrency());
        fonDto.setValorSuspension(fon.getValorSuspension());
        fonDto.setCount(fon.getCount());
        fonDto.setPrice(fon.getPrice());

        return fonDto;
    }
}
