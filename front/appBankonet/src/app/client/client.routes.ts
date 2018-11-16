import { Routes } from "@angular/router";
import { ClientUIComponent } from "./client-ui.component";
import { ListeCompteComponent } from "./liste-compte/liste-compte.component";
import { DebitComponent } from "./debit/debit.component";
import { CreditComponent } from "./credit/credit.component";
import { VirementComponent } from "./virement/virement.component";
import { EditInfosComponent } from "./edit-infos/edit-infos.component";


export const clientRoutes: Routes = [{

  path: '',
  component: ClientUIComponent,

  children: [{
    path: 'Liste',
    component: ListeCompteComponent,
  },
  {
    path: 'Debit',
    component: DebitComponent
  },
  {
    path: 'Credit',
    component: CreditComponent
  },
  {
    path: 'Virement',
    component: VirementComponent
  },
  {
    path: 'EditInfos',
    component: EditInfosComponent
  },
  {
    path:'',
    redirectTo:'Liste'
  }
]
}];​