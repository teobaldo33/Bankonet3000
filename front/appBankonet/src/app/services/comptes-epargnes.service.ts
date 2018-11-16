import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Epargne } from '../models/compteEpargne.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':'*'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ComptesEpargnesService {

  BASE_URL = environment.baseUrlComptesEpargne;
  BASE_URL_API = environment.baseUrlComptesEpargne;


  constructor(private http: HttpClient) {
    console.log('EpargneService constructor');
  }

  getCompteEpargne(id_client : number): Observable<Epargne[]> {
    //const options = {params: new HttpParams().set('id', id.toString())};
    return this.http.get<Epargne[]>(this.BASE_URL_API + id_client);
  }
  getCompteEpargneById(id : number): Observable<Epargne> {
    //const options = {params: new HttpParams().set('id', id.toString())};
    return this.http.get<Epargne>(this.BASE_URL_API + id);
  }

  updateCompteEpargne(id: number, compteEpargne: Epargne): Observable<Epargne> {
    return this.http.put<Epargne>(this.BASE_URL_API + id, compteEpargne, httpOptions);
  }

  delete(id: number): Observable<Epargne>{
    return this.http.delete<Epargne>(this.BASE_URL_API + id);
  }

  create(epargne : Epargne): Observable<Epargne> {
    return this.http.post<Epargne>(this.BASE_URL_API, epargne, httpOptions);
  }
  
}
