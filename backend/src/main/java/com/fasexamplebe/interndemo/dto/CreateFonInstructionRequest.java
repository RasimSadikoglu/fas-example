package com.fasexamplebe.interndemo.dto;

import com.fasexamplebe.interndemo.common.OperationTypeEnum;

import java.util.UUID;

public class CreateFonInstructionRequest {
    public UUID fonId;
    public OperationTypeEnum operationType;
    public float count;
}
