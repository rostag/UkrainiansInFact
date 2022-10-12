import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StoryService } from '../../services/story.service';
import { StoryDisplayMode } from '../../story';

@UntilDestroy()
@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  displayMode: StoryDisplayMode = 'storySingle';
  
  constructor(protected storyService: StoryService) { }

  ngOnInit(): void { }

  setDisplayMode(event: MatButtonToggleChange) {
    this.displayMode = event.value;
    this.storyService.collapseExpandedStories(this.displayMode);
  }

}
