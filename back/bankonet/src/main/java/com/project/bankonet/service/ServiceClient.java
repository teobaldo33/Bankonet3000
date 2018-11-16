package com.project.bankonet.service;

import com.project.bankonet.model.Client;
import com.project.bankonet.model.Compte;
import com.project.bankonet.model.CompteCourant;
import com.project.bankonet.model.CompteEpargne;
import com.project.bankonet.repository.ClientRepository;
import com.project.bankonet.repository.CompteCourantRepository;
import com.project.bankonet.repository.CompteEpargneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceClient {

    @Autowired
    ClientRepository clientRepository;
    @Autowired
    CompteCourantRepository courantRepo;
    @Autowired
    CompteEpargneRepository epargneRepo;
    @Autowired
    ServiceCompteCourant serviceCourant;
    @Autowired
    ServiceCompteEpargne serviceEpargne;

    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    public Client createClient( Client client){
        return clientRepository.save(client);
    }

    public Client getClientById(int id){
        return clientRepository.findById(id);
    }

    public Client getClientByEmail(String email){return clientRepository.findByEmail(email);}

    public Client updateClient(int id, Client clientDetail) {
        Client client = clientRepository.findById(id);

        client.setEmail(clientDetail.getEmail());
        client.setTel(clientDetail.getTel());
        client.setNom(clientDetail.getNom());
        client.setPrenom(clientDetail.getPrenom());

        Client updateClient = clientRepository.save(client);
        return updateClient;
    }

    public ResponseEntity<?> deleteClient(int id){
        Client client = clientRepository.findById(id);
        List<Compte> comptes = client.getCc();
        if(comptes != null){
            for(int i=0; i<comptes.size(); i++){
                Compte c = comptes.get(i);
                if(c.getdType().equals("CC")) {
                    serviceCourant.deleteCompteCourant(c.getId());
                }
            }
        }


        clientRepository.delete(client);

        return ResponseEntity.ok().build();
    }
}
