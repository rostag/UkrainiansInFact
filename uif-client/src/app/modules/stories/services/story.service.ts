import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth/auth.service';
import { StoryDialogComponent, StoryDialogResult } from '../components/add-story/story-dialog.component';
import { Story } from '../story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  storiesResult: Story[] = [];
  afsStoriesCollection: AngularFirestoreCollection<Story> = this.store.collection('stories');
  stories = this.getStoriesObservable(this.afsStoriesCollection) as Observable<Story[]>;
  
  randomStory!: Story;

  constructor(
    protected authService: AuthService,
    private store: AngularFirestore,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  getStoriesObservable(collection: AngularFirestoreCollection<Story>) {
    const subj = new BehaviorSubject<Story[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((value: Story[]) => {
      this.storiesResult = value;
      subj.next(value);
    });
    return subj;
  }

  getRandomStory(): Story {
    if (this.randomStory) {
      return this.randomStory;
    }
    this.randomStory = this.getStoryFromResult(Math.floor(Math.random() * this.storiesResult?.length));
    return this.randomStory;
  }

  getStoryFromResult(index: number) {
    return this.storiesResult[index]
  }

  addStory(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      data: {
        story: {
          title: 'Нова історія',
          text: 'Одного разу...',
          email: this.authService.userData.email,
          storyPath: 'new-story-' + (new Date()).valueOf()
        },
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

  goToStory(story: Story) {
    this.router.navigate(['story', story.storyPath]);
  }

}
