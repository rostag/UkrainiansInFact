import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Story } from '../../story';
import { StoryDialogComponent, StoryDialogResult } from '../add-story/story-dialog.component';

const getStoriesObservable = (collection: AngularFirestoreCollection<Story>) => {
  const subj = new BehaviorSubject<Story[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((value: Story[]) => {
    subj.next(value);
  });
  return subj;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  displayMode: 'storyList' | 'storyCarousel' | 'storyTitles' | 'single' = 'storyList';
  storySingleIndex: number = 0;

  afsStoriesCollection: AngularFirestoreCollection<Story> = this.store.collection('stories');
  stories = getStoriesObservable(this.afsStoriesCollection) as Observable<Story[]>;

  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  addStory(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      data: {
        story: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: StoryDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.afsStoriesCollection.add(result.story);
      });
  }

  editStory(story: Story): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      data: {
        story,
        enableDelete: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: StoryDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.afsStoriesCollection.doc(story.id).update(story);
    });
  }

  deleteStory(story: Story) {
    this.afsStoriesCollection.doc(story.id).delete();
  }

}
