import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HazeRoutingModule } from './haze-routing.module';
import { HazeComponent } from './haze.component';


@NgModule({
  declarations: [
    HazeComponent
  ],
  imports: [
    CommonModule,
    HazeRoutingModule
  ]
})
export class HazeModule { }
