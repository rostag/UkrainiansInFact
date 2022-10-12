import { Task } from './../task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subj = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[]) => {
    subj.next(val);
  });
  return subj;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.store.collection('done')) as Observable<Task[]>;

  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore
  ) { }

  ngOnInit(): void {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task);
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  drop(eventMock: CdkDragDrop<Task[] | null>): void {
    if (!eventMock || (eventMock.previousContainer === eventMock.container)) {
      return;
    }
    const event = eventMock as CdkDragDrop<Task[]>;
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }  

}
