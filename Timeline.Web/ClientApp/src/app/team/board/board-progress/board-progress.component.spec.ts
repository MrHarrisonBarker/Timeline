import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProgressComponent } from './board-progress.component';

describe('BoardProgressComponent', () => {
  let component: BoardProgressComponent;
  let fixture: ComponentFixture<BoardProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
