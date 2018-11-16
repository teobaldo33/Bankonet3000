import { Routes } from "@angular/router";
import { AgentUiComponent } from "./agent-ui.component";
import { ListeClientsComponent } from "./liste-clients/liste-clients.component";
import { ListeComptesComponent } from "./liste-comptes/liste-comptes.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { AjoutClientComponent } from "./ajout-client/ajout-client.component";
import { DelClientComponent } from "./del-client/del-client.component";
import { AjoutCompteComponent } from "./ajout-compte/ajout-compte.component";
import { DelCompteComponent } from "./del-compte/del-compte.component";

export const agentRoutes: Routes = [
    {
        path: '',
        component: AgentUiComponent,

        children: [{
            path: '',
            component: ListeClientsComponent,
        },
        {
            path: 'liste-comptes/:id',
            component: ListeComptesComponent
        },
        {
            path: 'edit-client/:id',
            component: EditClientComponent
        },
        {
            path: 'ajout-client',
            component: AjoutClientComponent
        },
        {
            path: 'delete-client/:id',
            component: DelClientComponent
        },
        {
            path: '',
            redirectTo: ''
        }
        ]
    },
    {
        path: 'ajout-compte/:id',
        component: AjoutCompteComponent
    },
    {
        path: 'delete-compte/:id/:type',
        component: DelCompteComponent
    }

];​