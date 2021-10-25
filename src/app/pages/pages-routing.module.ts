import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';



const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AdminGuard],
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AdminGuard] },
      { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AdminGuard], },

      { path: 'adminUsers', component: AdminUsuariosComponent, canActivate: [AdminGuard], },

    ]
  },
  //
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes,)
  ],

  exports: [RouterModule]
})
export class PagesRoutingModule { }
