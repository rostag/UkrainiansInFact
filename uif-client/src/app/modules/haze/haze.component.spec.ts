import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazeComponent } from './haze.component';

describe('HazeComponent', () => {
  let component: HazeComponent;
  let fixture: ComponentFixture<HazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
