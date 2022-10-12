import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoryDialogComponent, StoryDialogResult } from '../components/add-story/story-dialog.component';
import { Story } from '../story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storiesResult: Story[] = [];
  afsStoriesCollection: AngularFirestoreCollection<Story> = this.store.collection('stories');
  stories = this.getStoriesObservable(this.afsStoriesCollection) as Observable<Story[]>;

  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog
  ) { }

  getStoriesObservable(collection: AngularFirestoreCollection<Story>) {
    const subj = new BehaviorSubject<Story[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((value: Story[]) => {
      this.storiesResult = value;
      subj.next(value);
    });
    return subj;
  }

  getRandomStory() {
    const rnd = Math.floor(Math.random() * this.storiesResult?.length);
    return this.getStoryFromResult(rnd)
  }

  getStoryFromResult(index: number) {
    return this.storiesResult[index]
  }

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

  collapseExpandedStories(displayMode: string) {
    if (displayMode === 'storyTitle') {
      this.storiesResult.forEach(s => s.isExpanded = false);
    }
  }

}
