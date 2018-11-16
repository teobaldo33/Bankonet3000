import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { ClientAPI } from '../models/clientAPI.model';
import { Epargne } from '../models/compteEpargne.model';
import { Courant } from '../models/compteCourant.model';

@Injectable({
  providedIn: 'root'
})
export class TraitementAPIService {

  constructor() { }
  client: Client;
  clientAPI: ClientAPI;
  clients: Client[];
  currentCompteEpargne: Epargne;

  convertClientsAPIToClients(clientsAPI: ClientAPI[]): Client[]{
    this.clients = [];
    console.log("Entrée dans le converter");
    clientsAPI.forEach(clientAPI => {
      this.client = new Client();
      console.log("Bouclage du convertisseur : " + clientAPI);
      if (clientAPI) {
        this.client.id_client = clientAPI.id_client;
        this.client.firstname = clientAPI.prenom;
        this.client.name = clientAPI.nom;
        this.client.email = clientAPI.email;
        this.client.tel = clientAPI.tel;
        this.client.compteCourant = new Courant();
        this.client.comptesEpargne = [];
        for (let c of clientAPI.cc) {
          if (c.dType == "CC") {
            this.client.compteCourant.id = c.id;
            this.client.compteCourant.intitule = c.intitule;
            this.client.compteCourant.solde = c.solde;
            this.client.compteCourant.decouvert = c.decouvert;
            this.client.compteCourant.id_client = c.id_client;
            this.client.compteCourant.dType = c.dType;

          } else if (c.dType == "CE") {
            this.currentCompteEpargne = new Epargne();
            this.currentCompteEpargne.id = c.id;
            this.currentCompteEpargne.intitule = c.intitule;
            this.currentCompteEpargne.solde = c.solde;
            this.currentCompteEpargne.solde_min = c.solde_min;
            this.currentCompteEpargne.interet = c.interet;
            this.currentCompteEpargne.id_client = c.id_client;
            this.currentCompteEpargne.dType = c.dType;
            this.client.comptesEpargne.push(this.currentCompteEpargne);
          }
        }
        
        this.clients.push(this.client);
      }
    });   
    console.log("retour du converter");
    console.log(this.clients);
    return this.clients;
  }

  convertClientAPIToClient(clientAPI: ClientAPI): Client{
    this.client = new Client();
      if (clientAPI) {
        this.client.id_client = clientAPI.id_client;
        this.client.firstname = clientAPI.prenom;
        this.client.name = clientAPI.nom;
        this.client.email = clientAPI.email;
        this.client.tel = clientAPI.tel;
        this.client.compteCourant = new Courant();
        this.client.comptesEpargne = [];
        for (let c of clientAPI.cc) {
          if (c.dType == "CC") {
            this.client.compteCourant.id = c.id;
            this.client.compteCourant.intitule = c.intitule;
            this.client.compteCourant.solde = c.solde;
            this.client.compteCourant.decouvert = c.decouvert;
            this.client.compteCourant.id_client = c.id_client;
            this.client.compteCourant.dType = c.dType;

          } else if (c.dType == "CE") {
            this.currentCompteEpargne = new Epargne();
            this.currentCompteEpargne.id = c.id;
            this.currentCompteEpargne.intitule = c.intitule;
            this.currentCompteEpargne.solde = c.solde;
            this.currentCompteEpargne.solde_min = c.solde_min;
            this.currentCompteEpargne.interet = c.interet;
            this.currentCompteEpargne.id_client = c.id_client;
            this.currentCompteEpargne.dType = c.dType;

            this.client.comptesEpargne.push(this.currentCompteEpargne);
          }
        }
      }   
    return this.client; 
  }

  convertClientToClientAPI(client: Client): ClientAPI{
    this.clientAPI = new ClientAPI();
      if (client) {
        this.clientAPI.id_client = client.id_client;
        this.clientAPI.prenom = client.firstname;
        this.clientAPI.nom = client.name;
        this.clientAPI.email = client.email;
        this.clientAPI.tel = client.tel;
      }   
    return this.clientAPI; 
  }

}
