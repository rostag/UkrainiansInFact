import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Story } from '../../story';

export interface StoryDialogData {
  story: Partial<Story>;
  enableDelete: boolean;
}

export interface StoryDialogResult {
  story: Story;
}

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.css'],
})
export class StoryDialogComponent {

  private backupStory: Partial<Story> = { ...this.data.story };

  constructor(
    public dialogRef: MatDialogRef<StoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StoryDialogData
  ) {
  }

  cancel(): void {
    this.data.story.title = this.backupStory.title;
    this.data.story.text = this.backupStory.text;
    this.data.story.image = this.backupStory.image;
    this.data.story.isPublished = this.backupStory.isPublished;
    this.data.story.facebookProfile = this.backupStory.facebookProfile;
    this.data.story.instagramProfile = this.backupStory.instagramProfile;
    this.data.story.instagramEmbedCode = this.backupStory.instagramEmbedCode;
    this.dialogRef.close(this.data);
  }
}