import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courant } from '../models/compteCourant.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class ComptesCourantsService {

  BASE_URL = environment.baseUrlComptesCourant;
  BASE_URL_API = "http://localhost:8080/api/v1/CompteCourant/"

  constructor(private http: HttpClient) {
    console.log('CourantService constructor');
  }

  getCompteCourant(id : number): Observable<Courant[]> {
    //const options = {params: new HttpParams().set('id_client', id_client.toString())};
    return this.http.get<Courant[]>(this.BASE_URL_API + id);
  }
  getCompteCourantById(id : number): Observable<Courant> {
    //const options = {params: new HttpParams().set('id_client', id_client.toString())};
    return this.http.get<Courant>(this.BASE_URL_API + id);
  }
  updateCompteCourant(id: number, compteCourant: Courant): Observable<Courant> {
    return this.http.put<Courant>(this.BASE_URL_API + id, compteCourant, httpOptions);
  }

  delete(id: number): Observable<Courant>{
    return this.http.delete<Courant>(this.BASE_URL_API + id);
  }
  create(courant : Courant): Observable<Courant> {
    return this.http.post<Courant>(this.BASE_URL_API, courant, httpOptions);
  }
  
}
