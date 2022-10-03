import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNextComponent } from './whats-next.component';

describe('WhatsNextComponent', () => {
  let component: WhatsNextComponent;
  let fixture: ComponentFixture<WhatsNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
