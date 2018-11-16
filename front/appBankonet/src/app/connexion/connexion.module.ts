import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { connexionRoutes } from './connexion.routes';
import { ClientConnexionComponent } from './client-connexion/client-connexion.component';
import { AgentConnexionComponent } from './agent-connexion/agent-connexion.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(connexionRoutes),
    SharedModule
  ],
  declarations: [ClientConnexionComponent,AgentConnexionComponent]
})
export class ConnexionModule { }
