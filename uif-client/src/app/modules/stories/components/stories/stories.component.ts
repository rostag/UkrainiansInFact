import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StoryService } from '../../services/story.service';
import { StoryDisplayMode } from '../../story';

@UntilDestroy()
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  displayMode: StoryDisplayMode = 'storyTitle';
  
  constructor(
    protected storyService: StoryService,
    protected authService: AuthService
    ) { }

  ngOnInit(): void {
    this.storyService.collapseExpandedStories(this.displayMode);
  }

  setDisplayMode(event: MatButtonToggleChange) {
    this.displayMode = event.value;
    this.storyService.collapseExpandedStories(this.displayMode);
  }

}
