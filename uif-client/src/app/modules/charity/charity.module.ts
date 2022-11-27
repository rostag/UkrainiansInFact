import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharityRoutingModule } from './charity-routing.module';
import { CharityComponent } from './charity.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CharityComponent
  ],
  imports: [
    CommonModule,
    CharityRoutingModule,
    MatInputModule,
    FormsModule
  ]
})
export class CharityModule { }
