package com.project.bankonet.controller;

import com.project.bankonet.model.CompteEpargne;
import com.project.bankonet.service.ServiceCompteEpargne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class CompteEpargneController {
    @Autowired
    ServiceCompteEpargne CompteEpargneService;

    //Create new CompteEpargne
    @PostMapping("CompteEpargne")
    public ResponseEntity createCompteEpargne(@RequestBody CompteEpargne compte) {
        boolean cc = CompteEpargneService.createCompteEpargne(compte);
        System.out.println("demande de creation compte Epargne");

        if (cc){
            return new ResponseEntity(cc, HttpStatus.OK);
        }else{
            return new ResponseEntity(cc, HttpStatus.CONFLICT);
        }

    }
    //get all compte Epargne
    @GetMapping("CompteEpargne")
    public ResponseEntity getAllCounts() {
        List<CompteEpargne> compteEpargnes = CompteEpargneService.getAllCounts();
        return new ResponseEntity(compteEpargnes, HttpStatus.OK);
    }
    // Get a single CompteEpargne by id
    @GetMapping("/CompteEpargne/{id}")
    public ResponseEntity getCountById(@PathVariable(value = "id") int id){
        CompteEpargne checkCompte = CompteEpargneService.getCompteById(id);
        return new ResponseEntity(checkCompte, HttpStatus.OK);
    }

    //Delete a CompteEpargne
    @DeleteMapping("/CompteEpargne/{id}")
    public ResponseEntity<?> deleteCompteEpargne(@PathVariable(value = "id") Integer id){
        return  CompteEpargneService.deleteCompteEpargne(id);
    }
    // Update a CompteEpargne
    @PutMapping("/CompteEpargne/{id}")
    public ResponseEntity updateCompteEpargne(@PathVariable(value = "id") Integer id,
                                              @Valid @RequestBody CompteEpargne compteDetail){
        boolean updateCount = CompteEpargneService.updateCount(id, compteDetail);
        if (updateCount == true){
            return new ResponseEntity(updateCount, HttpStatus.OK);
        }else{
            return new ResponseEntity(updateCount, HttpStatus.CONFLICT);
        }
    }
}
