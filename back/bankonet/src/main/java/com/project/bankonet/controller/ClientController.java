package com.project.bankonet.controller;

import com.project.bankonet.model.Client;
import com.project.bankonet.service.ServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class ClientController {

    @Autowired
    ServiceClient clientService;

    // Get All Clients
    @GetMapping("/clients")
    public ResponseEntity getAllClients(){
        List<Client> clients = clientService.getAllClients();
        return new ResponseEntity(clients, HttpStatus.OK);
    }

    //Create a new Client
    @PostMapping("/client")
    public ResponseEntity createClient( @RequestBody Client client){
        Client newClient = clientService.createClient(client);
        return new ResponseEntity(newClient, HttpStatus.OK);
    }

    // Get a single Client by id
    @GetMapping("/client/{id}")
    public ResponseEntity getClientById(@PathVariable(value = "id") Integer id){
        Client checkClient = clientService.getClientById(id);
        return new ResponseEntity(checkClient, HttpStatus.OK);
    }

    // Get a single Client by email
    @GetMapping("/clientM/{email}")
    public ResponseEntity getClientByEmail(@PathVariable(value = "email") String email){
        Client checkClient = clientService.getClientByEmail(email);
        return new ResponseEntity(checkClient, HttpStatus.OK);
    }

    // Update a Client
    @PutMapping("/client/{id}")
    public ResponseEntity updateClient(@PathVariable(value = "id") Integer id,
                                       @Valid @RequestBody Client clientDetail){
        Client updateClient = clientService.updateClient(id, clientDetail);
        return new ResponseEntity(updateClient, HttpStatus.OK);
    }

    //Delete a Client
    @DeleteMapping("/client/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable(value = "id") Integer id){
        return  clientService.deleteClient(id);
    }

}
