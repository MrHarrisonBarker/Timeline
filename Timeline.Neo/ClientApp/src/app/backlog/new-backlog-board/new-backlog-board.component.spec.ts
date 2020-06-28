import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBacklogBoardComponent } from './new-backlog-board.component';

describe('NewBacklogBoardComponent', () => {
  let component: NewBacklogBoardComponent;
  let fixture: ComponentFixture<NewBacklogBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBacklogBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBacklogBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
