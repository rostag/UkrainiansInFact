import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenaissanceComponent } from './renaissance.component';

describe('RenaissanceComponent', () => {
  let component: RenaissanceComponent;
  let fixture: ComponentFixture<RenaissanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenaissanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenaissanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
