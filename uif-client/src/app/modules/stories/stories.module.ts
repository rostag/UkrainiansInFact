import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [
    StoriesComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule
  ]
})
export class StoriesModule { }
