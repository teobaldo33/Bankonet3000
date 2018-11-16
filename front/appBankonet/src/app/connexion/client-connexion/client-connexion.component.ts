import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-client-connexion',
  templateUrl: './client-connexion.component.html',
  styleUrls: ['./client-connexion.component.css']
})
export class ClientConnexionComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  errorMessage: String;

  clientConnexionForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  get email() { return this.clientConnexionForm.get('email') }

  constructor(private loginService: LoginService, private router: Router) {
    if (loginService.getUser()) {
      this.router.navigate(['Client']);
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    const formModel = this.clientConnexionForm.value;
    const email = formModel.email;
    const password = formModel.password;

    this.subscription = this.loginService.connect(email, password).subscribe((isConnected: boolean) => {
      if(isConnected == true){
        this.router.navigate(['Client']);
      }else{
        this.errorMessage = "connexion impossible, mail ou mdp faux";
      }
    }, (error) => {
      this.errorMessage = "connexion impossible, mail ou mdp faux";
    });

  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
