import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-connexion',
  templateUrl: './agent-connexion.component.html',
  styleUrls: ['./agent-connexion.component.css']
})
export class AgentConnexionComponent implements OnInit {

  subscription: Subscription;
  errorMessage: String;

  agentConnexionForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  get email() { return this.agentConnexionForm.get('email') }

  constructor(private loginService: LoginService, private router: Router) {
    if (loginService.getAgent()) {
      this.router.navigate(['agent']);
    }
  }

  ngOnInit() {
  }

  onSubmit() {

    this.loginService.connectAgent();
    this.router.navigate(['agent']);

  }

  
}
