import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ClientAPI } from 'src/app/models/clientAPI.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';
import { Courant } from 'src/app/models/compteCourant.model';
import { Epargne } from 'src/app/models/compteEpargne.model';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';

@Component({
  selector: 'app-ajout-compte',
  templateUrl: './ajout-compte.component.html',
  styleUrls: ['./ajout-compte.component.css']
})
export class AjoutCompteComponent implements OnInit, OnDestroy {


  id: number;
  subscription: Subscription;
  courant: Courant;
  epargne: Epargne;
  client: Client;
  clientAPI: ClientAPI;
  errorMessage: string;
  typeCompte: string;

  ajoutCompteCourantForm = new FormGroup({
    intituleCourant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    soldeCourant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    decouvertCourant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    typeCompte: new FormControl()
  });

  ajoutCompteEpargneForm = new FormGroup({
    intituleEpargne: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    soldeEpargne: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    interetEpargne: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    soldeMinEpargne: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    typeCompte: new FormControl()
  });

  get intituleCourant() { return this.ajoutCompteCourantForm.get('intituleCourant') };
  get soldeCourant() { return this.ajoutCompteCourantForm.get('soldeCourant') };
  get decouvertCourant() { return this.ajoutCompteCourantForm.get('decouvertCourant') };
  get intituleEpargne() { return this.ajoutCompteEpargneForm.get('intituleEpargne') };
  get soldeEpargne() { return this.ajoutCompteEpargneForm.get('soldeEpargne') };
  get interetEpargne() { return this.ajoutCompteEpargneForm.get('interetEpargne') };
  get soldeMinEpargne() { return this.ajoutCompteEpargneForm.get('soldeMinEpargne') };

  constructor(private courantService: ComptesCourantsService, private epargneService: ComptesEpargnesService, private route: ActivatedRoute, private clientService: ClientsService, private apiService: TraitementAPIService, private router: Router) {
    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.clientService.getClient(this.id).subscribe(
      (clientAPI: ClientAPI) => {
        this.client = this.apiService.convertClientAPIToClient(clientAPI);
      },
      (error) => {
        this.errorMessage = error;
      }
    )

  }

  ngOnInit() {
  }

  clickEpargne(): string {
    this.typeCompte = 'e';
    return 'epargne';
  }
  clickCourant(): string {
    this.typeCompte = 'c';
    return 'courant';
  }

  onSubmit() {

    const formModelCourant = this.ajoutCompteCourantForm.value;
    const formModelEpargne = this.ajoutCompteEpargneForm.value;

    if (this.typeCompte == 'c' && this.client.compteCourant.id == undefined) {
      this.courant = new Courant()
      this.courant.intitule = formModelCourant.intituleCourant;
      this.courant.solde = formModelCourant.soldeCourant;
      this.courant.decouvert = formModelCourant.decouvertCourant;
      this.courant.id_client = this.client.id_client;
      this.courantService.create(this.courant).subscribe(
        () => {
          this.router.navigate(['agent/']);
        },
        (error) => this.errorMessage = error
      )
    }
    if (this.typeCompte == 'e' && this.client.compteCourant) {
      this.epargne = new Epargne()
      this.epargne.intitule = formModelEpargne.intituleEpargne;
      this.epargne.solde = formModelEpargne.soldeEpargne;
      this.epargne.interet = formModelEpargne.interetEpargne;
      this.epargne.solde_min = formModelEpargne.soldeMinEpargne
      this.epargne.id_client = this.client.id_client;
      this.epargneService.create(this.epargne).subscribe(
        () => {
          this.router.navigate(['agent/']);
        },
        (error) => {
        this.errorMessage = error;
          this.router.navigate(['agent/']);
        }
      )
    }
    if (this.client.compteCourant.id != undefined) {
      this.errorMessage = "Le client a déja un compte courant";
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
