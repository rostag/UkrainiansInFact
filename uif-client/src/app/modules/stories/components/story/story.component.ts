import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Story, StoryDisplayMode } from '../../story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() displayMode: StoryDisplayMode = 'storySingle';

  @Input() story: Story = {
    id: '',
    title: '',
    text: '',
    image: '',
    isPublished: false,
    facebookProfile: '',
    instagramProfile: ''
  };

  @Output() edit = new EventEmitter<Story>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  editStory(story: Story) {
    this.edit.emit(story);
  }

}
