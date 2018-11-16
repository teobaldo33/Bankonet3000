import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentUiComponent } from './agent-ui.component';
import { RouterModule } from '@angular/router';
import { agentRoutes } from './agent.routes';
import { SharedModule } from '../shared/shared.module';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';
import { ListeClientsComponent } from './liste-clients/liste-clients.component';
import { ListeComptesComponent } from './liste-comptes/liste-comptes.component';
import { DelClientComponent } from './del-client/del-client.component';
import { DelCompteComponent } from './del-compte/del-compte.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(agentRoutes),
    SharedModule
  ],
  declarations: [AgentUiComponent, AjoutClientComponent, AjoutCompteComponent, ListeClientsComponent, ListeComptesComponent, DelClientComponent, DelCompteComponent, EditClientComponent],
  exports: [

  ]
})
export class AgentModule { }
