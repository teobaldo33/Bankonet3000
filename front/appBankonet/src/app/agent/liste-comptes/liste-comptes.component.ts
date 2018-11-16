import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { ClientAPI } from 'src/app/models/clientAPI.model';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';

@Component({
  selector: 'app-liste-comptes',
  templateUrl: './liste-comptes.component.html',
  styleUrls: ['./liste-comptes.component.css']
})
export class ListeComptesComponent implements OnInit, OnDestroy {

  id: number;
  subscription: Subscription;
  client: Client;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private clientService: ClientsService, private apiService: TraitementAPIService, private router: Router) {

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

  onAddCompte() {

    this.router.navigate(['agent/ajout-compte/' + this.id]);
  }

  onDelCompte(id: number, type: string) {
    this.router.navigate(['agent/delete-compte/' + id + '/' + type]);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
