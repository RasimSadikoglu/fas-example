package com.fasexamplebe.interndemo.repository;

import com.fasexamplebe.interndemo.model.Fon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FonRepository extends JpaRepository<Fon, UUID> {
    @Query("SELECT DISTINCT(f.code) FROM Fon f ORDER BY f.code")
    List<String> findDistinctFonCodes();

    @Query("SELECT DISTINCT(f.toMemberCode) FROM Fon f WHERE f.code = ?1 ORDER BY f.toMemberCode")
    List<String> findDistinctToMemberCodes(String fonCode);

    @Query("SELECT DISTINCT(f.currency) FROM Fon f WHERE f.code = ?1 AND f.toMemberCode = ?2 ORDER BY f.currency")
    List<String> findDistinctCurrencies(String fonCode, String toMemberCode);

    Optional<Fon> findFonByCodeAndToMemberCodeAndCurrency(String fonCode, String toMemberCode, String currency);

    @Query("SELECT DISTINCT(f.toMemberCode) FROM Fon f ORDER BY f.toMemberCode")
    List<String> getAllToMemberCodes();
}
