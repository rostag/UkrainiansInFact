import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenaissanceRoutingModule } from './renaissance-routing.module';
import { RenaissanceComponent } from './renaissance.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    RenaissanceComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RenaissanceRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RenaissanceModule { }
