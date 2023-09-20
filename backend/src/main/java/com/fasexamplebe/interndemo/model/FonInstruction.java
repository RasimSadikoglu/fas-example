package com.fasexamplebe.interndemo.model;

import com.fasexamplebe.interndemo.common.OperationTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fon_instruction")
public class FonInstruction {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    private String memberCode;
    private String fonCode;
    private String toMemberCode;
    private String currency;
    private LocalDate instructionDate;
    private LocalDate valorDate;
    private float count;
    private float price;

    @Enumerated(EnumType.STRING)
    private OperationTypeEnum operationType;
}
