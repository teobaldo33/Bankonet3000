import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Subscription } from 'rxjs';
import { ClientAPI } from 'src/app/models/clientAPI.model';
import { Client } from 'src/app/models/client.model';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';

@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css']
})
export class ListeClientsComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  errorMessage: string;

  clients: Client[];

  constructor(private clientsService: ClientsService, private apiService: TraitementAPIService) {

    this.subscription = this.clientsService.getClients().subscribe((clientsAPI: ClientAPI[]) => {
      if (clientsAPI) {
        this.clients = this.apiService.convertClientsAPIToClients(clientsAPI);
      }
    }, (error) => {
      this.errorMessage = error.message;
    });

  }

  ngOnInit() {

  }

  searchFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
