import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Story, StoryDisplayMode } from '../../story';
import { StoryDialogComponent, StoryDialogResult } from '../add-story/story-dialog.component';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit, OnDestroy {

  displayMode: StoryDisplayMode = 'storyList';
  storySingleIndex: number = 0;

  afsStoriesCollection: AngularFirestoreCollection<Story> = this.store.collection('stories');
  stories = this.getStoriesObservable(this.afsStoriesCollection) as Observable<Story[]>;

  storiesResult: Story[] = [];
  
  onDestroy$ = new Subject();

  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit(): void { }

  getStoriesObservable (collection: AngularFirestoreCollection<Story>) {
    const subj = new BehaviorSubject<Story[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((value: Story[]) => {
      this.storiesResult = value;
      subj.next(value);
    });
    return subj;
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

}
