import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientUIComponent } from './client-ui.component';
import { RouterModule } from '@angular/router';
import { clientRoutes } from '../client/client.routes';
import { ListeCompteComponent } from './liste-compte/liste-compte.component';
import { CreditComponent } from './credit/credit.component';
import { DebitComponent } from './debit/debit.component';
import { VirementComponent } from './virement/virement.component';
import { EditInfosComponent } from './edit-infos/edit-infos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(clientRoutes),
    SharedModule
  ],
  declarations: [ClientUIComponent, ListeCompteComponent, CreditComponent, DebitComponent, VirementComponent, EditInfosComponent],
  exports: [
    ListeCompteComponent,EditInfosComponent
  ]
})
export class ClientModule { }
