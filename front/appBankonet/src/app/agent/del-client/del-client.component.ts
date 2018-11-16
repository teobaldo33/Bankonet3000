import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';
import { ClientAPI } from 'src/app/models/clientAPI.model';

@Component({
  selector: 'app-del-client',
  templateUrl: './del-client.component.html',
  styleUrls: ['./del-client.component.css']
})
export class DelClientComponent implements OnInit, OnDestroy {


  id: number;
  delOk: boolean;
  client: Client;
  subscription: Subscription
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientsService, private apiService: TraitementAPIService) {

    this.id = +(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.clientService.getClient(this.id).subscribe(
      (clientAPI: ClientAPI) => {
        this.client = this.apiService.convertClientAPIToClient(clientAPI);
        if (this.client.compteCourant.solde < 0) {
          this.delOk = false
        } else {
          this.delOk = true;
        }
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onOui() {
    this.clientService.delete(this.id).subscribe(
      () => {
        this.router.navigate(['agent']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onNon() {
    this.router.navigate(['agent']);
  }


}
