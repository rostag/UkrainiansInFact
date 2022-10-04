import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { 
  }

  ngOnInit(): void {
  }

}
