import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as firebase from 'firebase/compat';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StoryService } from '../../services/story.service';
import { Story, StoryDisplayMode } from '../../story';

@UntilDestroy()
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  @Input() displayMode: StoryDisplayMode = 'storySingle';

  @Input() story!: Story;

  storyPath: string = '';

  items$: Observable<any[]>;
  pathFilter$: BehaviorSubject<any>;

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    protected storyService: StoryService,
    protected authService: AuthService,
    ) {
      this.pathFilter$ = new BehaviorSubject(null);
      this.items$ = this.pathFilter$.pipe(
        switchMap((storyPath) => 
          this.afStore.collection('stories', ref => {
            let query : firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
            if (storyPath) { query = query.where('storyPath', '==', storyPath) };
            return query;
          }).valueChanges()
        )
      );    
    }

  filterStoryByPath(storyPath: string|null) {
    this.pathFilter$.next(storyPath);
    this.items$.pipe(untilDestroyed(this)).subscribe((stories) => {
      this.story = stories[0] as Story
    })
  }
  
  ngOnInit(): void {
    if (!!this.story) {
      return;
    }
    this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.filterStoryByPath(params['storyPath']);
    })    
  }

  toggleStory(story: Story) {
    story.isExpanded = !story.isExpanded;
  }

}
