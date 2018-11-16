package com.project.bankonet.repository;

import com.project.bankonet.model.CompteEpargne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompteEpargneRepository extends JpaRepository<CompteEpargne, Integer> {
    List<CompteEpargne> findAll();
    CompteEpargne save(CompteEpargne compteEpargne);
    CompteEpargne findById(int id);
    void delete(CompteEpargne compteEpargne);
}
