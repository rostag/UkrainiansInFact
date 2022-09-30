import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

// Moved from app.module
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from './components/task/task.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TaskComponent,
    TasksComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatCardModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule
  ]
})
export class TasksModule { }
