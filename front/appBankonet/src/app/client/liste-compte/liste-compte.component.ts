import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Courant } from 'src/app/models/compteCourant.model';
import { Epargne } from 'src/app/models/compteEpargne.model';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.css']
})
export class ListeCompteComponent implements OnInit, OnDestroy {

  client: Client;
  compteCourant: Courant[];
  comptesEpargne: Epargne[];
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  errorMessage: String;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private courantService: ComptesCourantsService, private epargneService: ComptesEpargnesService) {

  }

  ngOnInit() {
    if (this.loginService.getUser() == undefined) {
      this.router.navigate(['/clientConnexion']);
    }
    this.loginService.reparerLesErreursDeDebutant();
    this.client = this.loginService.getUser();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

}
