import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardConfigComponent } from './board-config.component';

describe('BoardConfigComponent', () => {
  let component: BoardConfigComponent;
  let fixture: ComponentFixture<BoardConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
