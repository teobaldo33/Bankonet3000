import { Routes } from '@angular/router';
import { ClientConnexionComponent } from './connexion/client-connexion/client-connexion.component';
import { AgentConnexionComponent } from './connexion/agent-connexion/agent-connexion.component';


export const appRoutes: Routes = [​
  
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path:'clientConnexion' , component: ClientConnexionComponent},
    { path: 'agentConnexion' , component: AgentConnexionComponent},
    { path:'Client' , loadChildren:'./client/client.module#ClientModule'},
    { path:'agent' , loadChildren:'./agent/agent.module#AgentModule'}


  
];​