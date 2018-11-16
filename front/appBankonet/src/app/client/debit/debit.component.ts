import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent implements OnInit, OnDestroy {

  client: Client;
  subscription: Subscription;
  errorMessage: string;

  debitForm = new FormGroup({
    montant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    compte: new FormControl()
  });

  get compte() { return this.debitForm.get('compte') };
  get montant() { return this.debitForm.get('montant') };

  constructor(private loginService: LoginService, private courantService: ComptesCourantsService, private epargneService: ComptesEpargnesService, private router: Router) {
    this.client = this.loginService.getUser();
  }

  ngOnInit() {
  }

  onSubmit() {

    let i = 0;
    const formModel = this.debitForm.value;
    const compte = formModel.compte;
    const idCompteADebiter = parseInt(compte, 10);
    const montant = formModel.montant;


    if (this.client.compteCourant.id == idCompteADebiter && this.loginService.currentUser.compteCourant.solde - montant > 0 - this.loginService.currentUser.compteCourant.decouvert) {
      this.loginService.currentUser.compteCourant.solde -= montant;
      this.loginService.currentUserApi.cc[0].solde -= montant;
      this.courantService.updateCompteCourant(idCompteADebiter, this.loginService.currentUser.compteCourant).subscribe(
        () => {
          this.loginService.reparerLesErreursDeDebutant();
          this.router.navigate(['Client']);
        }
      );

    } else if (this.client.compteCourant.id == idCompteADebiter && this.loginService.currentUser.compteCourant.solde - montant < 0 - this.loginService.currentUser.compteCourant.decouvert) {
      this.errorMessage = 'Vous ne pouvez aller en dessous du decouvert autorisé de votre compte qui est : ' + this.loginService.currentUser.compteCourant.decouvert;
    }

    for (let e of this.client.comptesEpargne) {
      if (e.id == idCompteADebiter && e.solde - montant > e.solde_min) {
        this.loginService.currentUser.comptesEpargne[i].solde -= montant;
        this.loginService.currentUserApi.cc[1 + i].solde -= montant;
        this.epargneService.updateCompteEpargne(idCompteADebiter, this.loginService.currentUser.comptesEpargne[i]).subscribe(
          () => {
            this.loginService.reparerLesErreursDeDebutant();
            this.router.navigate(['Client']);
          }
        );

      } else if (e.id == idCompteADebiter && e.solde - montant < e.solde_min) {
        this.errorMessage = "Vous ne pouvez aller en dessous du solde minimum de votre compte qui est : " + e.solde_min;
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
