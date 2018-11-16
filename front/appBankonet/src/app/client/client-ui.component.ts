import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-ui',
  templateUrl: './client-ui.component.html',
  styleUrls: ['./client-ui.component.css']
})
export class ClientUIComponent implements OnInit {

  id: number;

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
    if(this.loginService.getUser() == undefined){
      this.router.navigate(['/clientConnexion']);
    }
  }

  onDisconnect() {
    console.log("Enter the onclickFunction");
    this.loginService.disconnect(); 
    this.router.navigate(['clientConnexion']);
    
  }

}
