import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
/* Avance de Indicadores */

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [

    SidebarComponent,
    HeaderComponent,
    /* Avance de Indicadores */

  ],

  exports: [

    SidebarComponent,
    HeaderComponent,
    /* Avance de Indicadores */



  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    /* Avance de Indicadores */
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
