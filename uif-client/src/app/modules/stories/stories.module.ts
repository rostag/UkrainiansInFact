import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/story/story.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StoryDialogComponent } from './components/add-story/story-dialog.component';

@NgModule({
  declarations: [
    StoriesComponent,
    StoryComponent,
    StoryDialogComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule
  ]
})
export class StoriesModule { }
