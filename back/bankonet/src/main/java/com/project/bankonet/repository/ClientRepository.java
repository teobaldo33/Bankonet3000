package com.project.bankonet.repository;

import com.project.bankonet.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
     List<Client> findAll();
     Client save(Client client);
     Client findById(int id);
     Client findByEmail(String email);
     void delete(Client client);
}
