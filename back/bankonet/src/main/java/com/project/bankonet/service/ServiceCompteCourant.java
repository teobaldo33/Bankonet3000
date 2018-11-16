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
public class ServiceCompteCourant {
    @Autowired
    CompteCourantRepository CompteCourantRepo;
    @Autowired
    CompteEpargneRepository compteEpargneRepo;
    @Autowired
    ClientRepository clientRepo;

    public boolean createCompteCourant(CompteCourant compte){
        Compte compteTest;
        int idClient = compte.getId_client();
        Client client = clientRepo.findById(idClient);
        List<Compte> x = client.getCc();
        boolean response = true;

        for (int i = 0 ; i < x.size() ; i++){
            compteTest = x.get(i);
            if (compteTest.getdType().equals("CC")){
                response = false;
                System.out.println("dTYPE = CC");
                break;
            }
        }
        if (response){
            CompteCourantRepo.save(compte);
        }
        return response;
    }

    public List<CompteCourant> getAllCounts(){
        return CompteCourantRepo.findAll();
    }
    public CompteCourant getCompteById(int id){
        return CompteCourantRepo.findById(id);
    }

    public ResponseEntity<?> deleteCompteCourant(int id){

        CompteCourant compteCourant = CompteCourantRepo.findById(id);
        int idCompteCourant = id;
        int idCompteEpargne;
        double soldeCompteEpargne;
        int idClient = compteCourant.getId_client();
        Client client = clientRepo.findById(idClient);
        List<Compte> listing = client.getCc();

        for(int i = 0; i < listing.size(); i++){
            Compte compteTest = listing.get(i);
            if (compteTest.getdType().equals("CE")){
                idCompteEpargne = compteTest.getId();
                soldeCompteEpargne = compteTest.getSolde();
                System.out.println("solde compte epargne : " + soldeCompteEpargne );
                System.out.println("solde compte courant actuel : " + compteCourant.getSolde());
                compteCourant.setSolde(compteCourant.getSolde()+soldeCompteEpargne);
                System.out.println("new solde compte courant");
                CompteEpargne compteEpargne = compteEpargneRepo.findById(idCompteEpargne);
                CompteCourantRepo.save(compteCourant);
                compteEpargneRepo.delete(compteEpargne);
            }
        }
        CompteCourantRepo.delete(compteCourant);

        return ResponseEntity.ok().build();

    }

    public boolean updateCount(int id, CompteCourant compteDetail) {
        CompteCourant count = CompteCourantRepo.findById(id);


        if(compteDetail.getSolde() < 0 - compteDetail.getDecouvert()){
            return  false;
        }else{
            count.setId(count.getId());
            count.setDecouvert(compteDetail.getDecouvert());
            count.setdType("CC");
            count.setIntitule(compteDetail.getIntitule());
            count.setId_client(compteDetail.getId_client());
            count.setSolde(compteDetail.getSolde());

            CompteCourant updateCount = CompteCourantRepo.save(count);
            return true;
        }

    }
}
