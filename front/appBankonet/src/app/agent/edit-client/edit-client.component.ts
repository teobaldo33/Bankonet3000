import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { TraitementAPIService } from 'src/app/services/traitement-api.service';
import { ClientAPI } from 'src/app/models/clientAPI.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {


  id: number;
  subscription: Subscription;
  client: Client;
  errorMessage: string;

  editInfosForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    tel: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  get email() { return this.editInfosForm.get('email') };
  get tel() { return this.editInfosForm.get('tel') };

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

  ngOnInit() {
  }

  onSubmit() {

    const formModel = this.editInfosForm.value;
    const email = formModel.email;
    const tel = formModel.tel;

    this.client.email = email;
    this.client.tel = tel;

    this.clientService.updateInfosClient(this.apiService.convertClientToClientAPI(this.client)).subscribe(
      () => {
        this.router.navigate(['/agent']);
      }
    );


  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
