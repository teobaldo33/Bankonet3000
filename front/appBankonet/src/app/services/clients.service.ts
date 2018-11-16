import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { catchError } from 'rxjs/operators';
import { ClientAPI } from '../models/clientAPI.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  BASE_URL = environment.baseUrlClients;
  BASE_URL_API = environment.BASE_URL_API;
  handleError: any;

  constructor(private http: HttpClient) {
    console.log('ClientsService constructor');
  }

  getClients(): Observable<ClientAPI[]> {
    return this.http.get<ClientAPI[]>(this.BASE_URL_API + "clients/");
  }

  getClient(id_client: number): Observable<ClientAPI> {
    return this.http.get<ClientAPI>(`${this.BASE_URL_API}client/${id_client}`);
  }

  getClientByEmail(email: string): Observable<Client[]> {
    //const options = {params: new HttpParams().set('email', email)};
    return this.http.get<Client[]>(this.BASE_URL_API + "/clientM/" + email);
  }

  create(client: ClientAPI): Observable<ClientAPI> {
    return this.http.post<ClientAPI>(this.BASE_URL_API + "client", client,httpOptions);
  }

  delete(id: number): Observable<ClientAPI> {
    return this.http.delete<ClientAPI>(this.BASE_URL_API + "client/" + id);
  }

  updateInfosClient(client: ClientAPI): Observable<ClientAPI> {
    return this.http.put<ClientAPI>(this.BASE_URL_API + 'client/' + client.id_client, client, httpOptions);
    // .pipe(
    //   catchError(this.handleError('updateHero', client))
    // );
  }

}
