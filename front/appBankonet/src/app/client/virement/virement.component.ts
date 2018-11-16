import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit, OnDestroy {

  client: Client;
  subscription: Subscription;
  errorMessage: string;

  virementForm = new FormGroup({
    montant: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    compteACrediter: new FormControl(),
    compteADebiter: new FormControl()

  });

  get compteACrediter() { return this.virementForm.get('compteACrediter') };
  get compteADebiter() { return this.virementForm.get('compteADebiter') };
  get montant() { return this.virementForm.get('montant') };

  constructor(private loginService: LoginService, private courantService: ComptesCourantsService, private epargneService: ComptesEpargnesService, private router: Router) {
    this.client = this.loginService.getUser();
  }

  ngOnInit() {
  }

  onSubmit() {

    let i = 0;
    let j = 0;

    const formModel = this.virementForm.value;
    const compteACrediter = formModel.compteACrediter;
    const compteADebiter = formModel.compteADebiter;
    const idCompteACrediter = parseInt(compteACrediter,10);
    const idCompteADebiter = parseInt(compteADebiter,10);
    const montant = formModel.montant;
    let debitEffectue: boolean;

    if (idCompteACrediter == idCompteADebiter) {
      this.errorMessage = "Vous ne pouvez pas effectuer un virement sur le même compte";
    } else {
      if (this.client.compteCourant.id == idCompteADebiter && this.loginService.currentUser.compteCourant.solde - montant > 0 - this.loginService.currentUser.compteCourant.decouvert) {
        this.loginService.currentUser.compteCourant.solde -= montant;

        this.courantService.updateCompteCourant(idCompteADebiter, this.loginService.currentUser.compteCourant).subscribe();
        debitEffectue = true;
      } else if (this.client.compteCourant.id == idCompteADebiter && this.loginService.currentUser.compteCourant.solde - montant < 0 - this.loginService.currentUser.compteCourant.decouvert) {
        this.errorMessage = 'Vous ne pouvez aller en dessous du decouvert autorisé de votre compte qui est : ' + this.loginService.currentUser.compteCourant.decouvert;
        debitEffectue = false;
      }
      for (let e of this.client.comptesEpargne) {
        if (e.id == idCompteADebiter && e.solde - montant > e.solde_min) {
          this.loginService.currentUser.comptesEpargne[i].solde -= montant;

          this.epargneService.updateCompteEpargne(idCompteADebiter, this.loginService.currentUser.comptesEpargne[i]).subscribe();
          debitEffectue = true;

        } else if (e.id == idCompteADebiter && e.solde - montant < e.solde_min) {
          this.errorMessage = "Vous ne pouvez aller en dessous du solde minimum de votre compte qui est : " + e.solde_min;
          debitEffectue = false;
        }
        i++
      }
      if (this.client.compteCourant.id == idCompteACrediter && debitEffectue == true) {
        this.loginService.currentUser.compteCourant.solde += montant;

        this.courantService.updateCompteCourant(idCompteACrediter, this.loginService.currentUser.compteCourant).subscribe(
          () => {
            this.loginService.reparerLesErreursDeDebutant();
            this.router.navigate(['Client']);
          }
        );

      }
      for (let e of this.client.comptesEpargne) {
        if (e.id == idCompteACrediter && debitEffectue == true) {
          this.loginService.currentUser.comptesEpargne[j].solde += montant;

          this.epargneService.updateCompteEpargne(idCompteACrediter, this.loginService.currentUser.comptesEpargne[j]).subscribe(
            () => {
              this.loginService.reparerLesErreursDeDebutant();
              this.router.navigate(['Client']);
            }
          );

        }
        j++
      }
    }
    this.errorMessage = "L'api a fail" + debitEffectue;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
