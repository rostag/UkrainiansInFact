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
    window.alert('Функція тимчасово доступна лише розробникам - для запобігання втрати правок. Скоро ми це виправимо. До речі, додавати історії можна вже зараз!')
    return;
    // this.edit.emit(story);
  }

  toggleStory(story: Story) {
    story.isExpanded = !story.isExpanded;
  }

}
