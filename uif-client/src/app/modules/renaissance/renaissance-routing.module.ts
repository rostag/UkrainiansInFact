import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenaissanceComponent } from './renaissance.component';

const routes: Routes = [{ path: '', component: RenaissanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenaissanceRoutingModule { }
