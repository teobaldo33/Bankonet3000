import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-ui',
  templateUrl: './agent-ui.component.html',
  styleUrls: ['./agent-ui.component.css']
})
export class AgentUiComponent implements OnInit {

  id: number;

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
    if (this.loginService.getAgent() == undefined) {
      this.router.navigate(['/agentConnexion']);
    }
  }

  onDisconnect() {
    console.log("Enter the onclickFunction");
    this.loginService.disconnect();
    this.router.navigate(['agentConnexion']);

  }

}
