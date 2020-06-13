import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDashComponent } from './team-dash.component';

describe('TeamDashComponent', () => {
  let component: TeamDashComponent;
  let fixture: ComponentFixture<TeamDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
