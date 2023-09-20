package com.fasexamplebe.interndemo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FonDto {
    private UUID id;
    private String code;
    private String explanation;
    private String toMemberCode;
    private String toMemberExplanation;
    private String currency;
    private int valorSuspension;
    private int count;
    private float price;
}
