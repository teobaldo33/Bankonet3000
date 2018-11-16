import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Epargne } from 'src/app/models/compteEpargne.model';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit, OnDestroy {

  client: Client;
  subscription: Subscription;
  errorMessage: string;

  creditForm = new FormGroup({
    montant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    compte: new FormControl()
  });

  get compte() { return this.creditForm.get('compte') };
  get montant() { return this.creditForm.get('montant') };

  constructor(private loginService: LoginService, private courantService: ComptesCourantsService, private epargneService: ComptesEpargnesService, private router: Router) {
    this.client = this.loginService.getUser();
  }

  ngOnInit() {
  }

  onSubmit() {
    let i = 0;
    const formModel = this.creditForm.value;
    const compte = formModel.compte;
    const idCompteACrediter = parseInt(compte, 10);
    const montant = formModel.montant;

    if (this.client.compteCourant.id == idCompteACrediter) {
      this.loginService.currentUser.compteCourant.solde += montant;
      this.loginService.currentUserApi.cc[0].solde += montant;
      this.courantService.updateCompteCourant(idCompteACrediter, this.loginService.currentUser.compteCourant).subscribe(
        () => {
          this.loginService.reparerLesErreursDeDebutant();
          this.router.navigate(['Client']);
        }
      );
    }

    for (let e of this.client.comptesEpargne) {
      if (e.id == idCompteACrediter) {
        this.loginService.currentUser.comptesEpargne[i].solde += montant;
        this.loginService.currentUserApi.cc[1 + i].solde += montant;
        this.epargneService.updateCompteEpargne(idCompteACrediter, this.loginService.currentUser.comptesEpargne[i]).subscribe(
          () => {
            this.loginService.reparerLesErreursDeDebutant();
            this.router.navigate(['Client']);
          }
        );
      }
      i++
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
