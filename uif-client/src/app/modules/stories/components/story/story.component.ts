import { Component, Input, OnInit } from '@angular/core';
import { Story } from '../../story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() displayMode: 'full' | 'title' = 'full';

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
