import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/story/story.component';

const routes: Routes = [
  { path: '', component: StoriesComponent },
  { path: ':storyPath', component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule { }
