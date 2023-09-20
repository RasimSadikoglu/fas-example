package com.fasexamplebe.interndemo.map;

import com.fasexamplebe.interndemo.dto.FonDto;
import com.fasexamplebe.interndemo.model.Fon;

public class MapFonDtoToFon {

    public static Fon map(FonDto fonDto) {
        Fon fon = new Fon();

        fon.setCode(fonDto.getCode());
        fon.setExplanation(fonDto.getExplanation());
        fon.setToMemberCode(fonDto.getToMemberCode());
        fon.setToMemberExplanation(fonDto.getToMemberExplanation());
        fon.setCurrency(fonDto.getCurrency());
        fon.setValorSuspension(fonDto.getValorSuspension());
        fon.setCount(fonDto.getCount());
        fon.setPrice(fonDto.getPrice());

        return fon;
    }
}
