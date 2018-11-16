import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ClientConnexionComponent } from './connexion/client-connexion/client-connexion.component';
import { SharedModule } from './shared/shared.module';
import { AgentConnexionComponent } from './connexion/agent-connexion/agent-connexion.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientConnexionComponent,
    AgentConnexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
