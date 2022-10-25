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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { StoryService } from './services/story.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [
    StoriesComponent,
    StoryComponent,
    StoryDialogComponent,
    SafeHtmlPipe,
    BlogComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    StoryService
  ]
})
export class StoriesModule { }
