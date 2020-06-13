import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactBoardComponent } from './compact-board.component';

describe('CompactBoardComponent', () => {
  let component: CompactBoardComponent;
  let fixture: ComponentFixture<CompactBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompactBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
