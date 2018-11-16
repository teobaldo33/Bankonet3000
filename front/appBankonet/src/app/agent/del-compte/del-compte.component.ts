import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';
import { ClientAPI } from 'src/app/models/clientAPI.model';
import { ComptesCourantsService } from 'src/app/services/comptes-courants.service';
import { ComptesEpargnesService } from 'src/app/services/comptes-epargnes.service';
import { Courant } from 'src/app/models/compteCourant.model';
import { Epargne } from 'src/app/models/compteEpargne.model';

@Component({
  selector: 'app-del-compte',
  templateUrl: './del-compte.component.html',
  styleUrls: ['./del-compte.component.css']
})
export class DelCompteComponent implements OnInit, OnDestroy {


  id: number;
  type: string;
  delOk: boolean;
  client: Client;
  id_client: number;
  courant: Courant;
  epargne: Epargne;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  errorMessage: string;

  constructor(private epargneService: ComptesEpargnesService, private courantService: ComptesCourantsService, private route: ActivatedRoute, private router: Router, private clientService: ClientsService, private apiService: TraitementAPIService) {
    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.paramMap.get('type');
  }

  ngOnInit() {

    if (this.type == "CC") {
      this.subscription = this.courantService.getCompteCourantById(this.id).subscribe(
        (courant: Courant) => {
          this.courant = courant;
          this.id_client = this.courant.id_client;

          this.subscription2 = this.clientService.getClient(this.id_client).subscribe(
            (clientAPI: ClientAPI) => {
              this.client = this.apiService.convertClientAPIToClient(clientAPI);
              if (this.type == "CE") {
                this.delOk = true;
              } else if (this.type == "CC" && this.client.comptesEpargne.length == 0 && this.courant.solde > 0) {
                this.delOk = true;
              } else {
                this.delOk = false;
              }
            },
            (error) => {
              this.errorMessage = error;
            }
          )

        },
        (error) => {
          this.errorMessage = error;
        }
      )
    }

    if (this.type == "CE") {
      this.subscription3 = this.epargneService.getCompteEpargneById(this.id).subscribe(
        (epargne: Epargne) => {

          this.epargne = epargne;
          this.id_client = this.epargne.id_client;
          this.subscription2 = this.clientService.getClient(this.id_client).subscribe(
            (clientAPI: ClientAPI) => {
              this.client = this.apiService.convertClientAPIToClient(clientAPI);
              if (this.type == "CE") {
                this.delOk = true;
              } else if (this.type == "CC" && this.client.comptesEpargne.length == 0 && this.courant.solde > 0) {
                this.delOk = true;
              } else {
                this.delOk = false;
              }
            },
            (error) => {
              this.errorMessage = error;
            }
          )


        },
        (error) => {
          this.errorMessage = error;
        }
      )
    }

  }

  onOui() {

    if (this.type == "CC") {
      this.courantService.delete(this.id).subscribe(
        () => {
          this.router.navigate(['agent/']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else if (this.type == "CE") {
      this.epargneService.delete(this.id).subscribe(
        () => {
          this.router.navigate(['agent/']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }


  }

  onNon() {
    this.router.navigate(['agent/']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }


}
