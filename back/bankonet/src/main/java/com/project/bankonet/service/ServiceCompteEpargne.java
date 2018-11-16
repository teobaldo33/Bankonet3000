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
public class ServiceCompteEpargne {

    @Autowired
    CompteEpargneRepository compteEpargneRepo;
    @Autowired
    ClientRepository clientRepo;
    @Autowired
    CompteCourantRepository compteCourantRepository;

    public boolean createCompteEpargne(CompteEpargne compte){
        boolean response = false;
        Compte compteTest;
        int idClient = compte.getId_client();
        Client client = clientRepo.findById(idClient);
        List<Compte> x = client.getCc();

        for (int i = 0; i < x.size(); i++){
            compteTest = x.get(i);
            if(compteTest.getdType().equals("CC")){
                response = true;
                if (compte.getSolde() >= compte.getSolde_min()){
                    System.out.println("CREATION COMPTE EPARGNE");
                    compteEpargneRepo.save(compte);
                }else{
                    response = false;
                }
            }
        }

        return response;
    }

    public List<CompteEpargne> getAllCounts(){
        return compteEpargneRepo.findAll();
    }
    public CompteEpargne getCompteById(int id){
        return compteEpargneRepo.findById(id);
    }

    public ResponseEntity<?> deleteCompteEpargne(int id){

        CompteEpargne compteEpargne = compteEpargneRepo.findById(id);
        CompteCourant compteCourantClient = new CompteCourant();
        double soldeCE = compteEpargne.getSolde();
        int idCompteCourantClient;
        int idClient = compteEpargne.getId_client();
        Client client = clientRepo.findById(idClient);
        List<Compte> listing = client.getCc();

        for (int i = 0 ; i < listing.size() ; i++){
           Compte compteTest = listing.get(i);
            if (compteTest.getdType().equals("CC")){

                idCompteCourantClient = compteTest.getId();
                compteCourantClient = compteCourantRepository.findById(idCompteCourantClient);
                compteCourantClient.setSolde(compteCourantClient.getSolde()+soldeCE);
                break;
            }
        }

        compteCourantRepository.save(compteCourantClient);
        System.out.println("debut de suppresion");
        compteEpargneRepo.delete(compteEpargne);
        System.out.println("delete : " + compteEpargne.getIntitule() + " solde : " + compteEpargne.getSolde());
        return ResponseEntity.ok().build();
    }

    public boolean updateCount(int id, CompteEpargne compteDetail) {

        CompteEpargne count = compteEpargneRepo.findById(id);

        if(compteDetail.getSolde() < 0 + compteDetail.getSolde_min()){
            return  false;
        }else{
            count.setId(count.getId());
            count.setdType("CE");
            count.setIntitule(compteDetail.getIntitule());
            count.setInteret(compteDetail.getInteret());
            count.setId_client(compteDetail.getId_client());
            count.setSolde_min(compteDetail.getSolde_min());
            count.setSolde(compteDetail.getSolde());

            compteEpargneRepo.save(count);
            return true;
        }

    }
}
