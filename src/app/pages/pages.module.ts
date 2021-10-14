import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoComponent } from './contenido/contenido.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfilesComponent } from './profiles/profiles.component';



@NgModule({
  declarations: [
    ContenidoComponent,
    ProfilesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class PagesModule { }
