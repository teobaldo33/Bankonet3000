import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent implements OnInit, OnDestroy {

  client: Client;
  subscription: Subscription;
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

  constructor(private loginService: LoginService, private clientService: ClientsService, private router: Router) {

    this.client = this.loginService.getUser();

  }

  get email() { return this.editInfosForm.get('email') };
  get tel() { return this.editInfosForm.get('tel') };



  ngOnInit() {
  }

  onSubmit() {

    const formModel = this.editInfosForm.value;
    const email = formModel.email;
    const tel = formModel.tel;
    this.loginService.currentUserApi.email = email;
    this.loginService.currentUserApi.tel = tel;
    this.loginService.currentUser.email = email;
    this.loginService.currentUser.tel = tel;

    this.clientService.updateInfosClient(this.loginService.currentUserApi).subscribe(
      () => {
        this.loginService.reparerLesErreursDeDebutant();
        this.router.navigate(['Client']);
      }
    );
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
