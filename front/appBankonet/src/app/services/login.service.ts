import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ClientAPI } from '../models/clientAPI.model';
import { Epargne } from '../models/compteEpargne.model';
import { Courant } from '../models/compteCourant.model';
import { Agent } from '../models/agent.model';
import { TraitementAPIService } from './traitement-api.service';

const BASE_URL = environment.baseUrlClients;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserApi: ClientAPI;
  currentUser: Client;
  currentAgent: Agent;
  currentCompteEpargne: Epargne;

  constructor(private http: HttpClient, private serviceApi:TraitementAPIService) { }

  connectAgent() {
    this.currentAgent = new Agent();
    this.currentAgent.nom = "Bond";
    this.currentAgent.prenom = "James";
  }

  connect(email: string, password: string): Observable<boolean> {
    //const options = { params: new HttpParams().set('email', email) };
    return this.http.get<ClientAPI>("http://localhost:8080/api/v1/clientM/" + email).pipe(
      switchMap((client: ClientAPI) => {
        this.currentUserApi = client;
        if (client) {
          this.currentUser = this.serviceApi.convertClientAPIToClient(client);
          return of(true);
        }
        return of(false);
      }),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }

  disconnect(): void {
    this.currentUser = undefined;
    this.currentUserApi = undefined;
    this.currentAgent = undefined;
  }


  getUser(): Client {
    return this.currentUser;
  }
  getAgent(): Agent {
    return this.currentAgent;
  }

  reparerLesErreursDeDebutant() {
    this.http.get<ClientAPI>("http://localhost:8080/api/v1/client/" + this.currentUserApi.id_client).subscribe(
      (client: ClientAPI) => {
        this.currentUserApi = client;
        this.currentUser = this.serviceApi.convertClientAPIToClient(client);
      }
    );


  }


}
