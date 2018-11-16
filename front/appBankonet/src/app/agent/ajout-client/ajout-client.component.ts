import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';
import { ClientAPI } from 'src/app/models/clientAPI.model';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit, OnDestroy {


  id: number;
  subscription: Subscription;
  client: Client;
  clientAPI: ClientAPI;
  errorMessage: string;

  ajoutClientForm = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    prenom: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  get email() { return this.ajoutClientForm.get('email') };
  get tel() { return this.ajoutClientForm.get('tel') };
  get nom() { return this.ajoutClientForm.get('nom') };
  get prenom() { return this.ajoutClientForm.get('prenom') };

  constructor(private route: ActivatedRoute, private clientService: ClientsService, private apiService: TraitementAPIService, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {

    const formModel = this.ajoutClientForm.value;
    this.clientAPI = new ClientAPI();
    this.clientAPI.nom = formModel.nom;
    this.clientAPI.prenom = formModel.prenom;
    this.clientAPI.tel = formModel.tel;
    this.clientAPI.email = formModel.email;

    this.clientService.create(this.clientAPI).subscribe(
      () => {
        this.router.navigate(['/agent']);
      },
      (error) => this.errorMessage = error
    );



  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
