import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WhatsNextComponent } from './components/whats-next/whats-next.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    WhatsNextComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
