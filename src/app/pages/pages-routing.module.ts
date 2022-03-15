import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { RoleGuard } from '../guards/role.guard';



const routes: Routes = [
  {
    path: 'dashboard', canActivate: [AdminGuard],
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AdminGuard, RoleGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AdminGuard, RoleGuard] },
      { path: 'account-settings', component: AccountSettingsComponent, canActivate: [AdminGuard, RoleGuard], },

      { path: 'adminUsers', component: AdminUsuariosComponent, canActivate: [AdminGuard, RoleGuard], },

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
