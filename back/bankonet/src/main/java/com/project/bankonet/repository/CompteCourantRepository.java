package com.project.bankonet.repository;

import com.project.bankonet.model.CompteCourant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompteCourantRepository extends JpaRepository<CompteCourant, Integer> {
    List<CompteCourant> findAll();
    CompteCourant save(CompteCourant compteCourant);
    CompteCourant findById(int id);
    void delete(CompteCourant compteCourant);
}


