import { PipesModule } from './../pipes/pipes.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { UserPagComponent } from './user-pag/user-pag.component';

import { ChartsModule } from 'ng2-charts';








@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    UserPagComponent,

    AdminUsuariosComponent,
    AccountSettingsComponent,
    UserPagComponent


  ],

  exports: [

    PagesComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    PagesRoutingModule,
    PipesModule,
    NgxPaginationModule,
    ChartsModule
  ]
})



export class PagesModule { }
