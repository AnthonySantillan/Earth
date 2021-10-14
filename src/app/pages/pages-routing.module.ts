import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { ProfilesComponent } from './profiles/profiles.component';


const routes: Routes = [
  { path: 'profiles', component: ProfilesComponent, pathMatch: 'full' },
  { path: 'contenido', component: ContenidoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
