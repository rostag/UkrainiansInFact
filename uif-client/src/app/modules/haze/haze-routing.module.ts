import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HazeComponent } from './haze.component';

const routes: Routes = [{ path: '', component: HazeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HazeRoutingModule { }
