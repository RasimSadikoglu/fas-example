package com.fasexamplebe.interndemo.repository;

import com.fasexamplebe.interndemo.model.FonInstruction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FonInstructionRepository extends JpaRepository<FonInstruction, UUID> {

}
