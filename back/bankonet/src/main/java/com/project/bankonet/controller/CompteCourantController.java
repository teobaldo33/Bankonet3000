package com.project.bankonet.controller;

import com.project.bankonet.model.CompteCourant;
import com.project.bankonet.service.ServiceCompteCourant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class CompteCourantController {
    @Autowired
    ServiceCompteCourant CompteCourantService;

    //Create new CompteCourant
    @PostMapping("CompteCourant")
    public ResponseEntity createCompteCourant(@RequestBody CompteCourant compte) {
        boolean cc = CompteCourantService.createCompteCourant(compte);
        System.out.println("demande de creation compte courant");
        if (cc){
            return new ResponseEntity(cc, HttpStatus.OK);
        }else{
            return new ResponseEntity(cc, HttpStatus.CONFLICT);
        }

    }
    //get all compte courant
    @GetMapping("CompteCourant")
    public ResponseEntity getAllCounts() {
        List<CompteCourant> compteCourants = CompteCourantService.getAllCounts();
        return new ResponseEntity(compteCourants, HttpStatus.OK);
    }
    // Get a single CompteCourant by id
    @GetMapping("/CompteCourant/{id}")
    public ResponseEntity getCountById(@PathVariable(value = "id") int id){
        CompteCourant checkCompte = CompteCourantService.getCompteById(id);
        return new ResponseEntity(checkCompte, HttpStatus.OK);
    }
    //Delete a Client
    @DeleteMapping("/CompteCourant/{id}")
    public ResponseEntity<?> deleteCompteCourant(@PathVariable(value = "id") Integer id){
        return  CompteCourantService.deleteCompteCourant(id);
    }

    // Update a Client
    @PutMapping("/CompteCourant/{id}")
    public ResponseEntity updateCompteCourant(@PathVariable(value = "id") Integer id,
                                       @Valid @RequestBody CompteCourant compteDetail){
        boolean updateCount = CompteCourantService.updateCount(id, compteDetail);
        if (updateCount == true){
            return new ResponseEntity(updateCount, HttpStatus.OK);
        }else{
            return new ResponseEntity(updateCount, HttpStatus.CONFLICT);
        }

    }
}
