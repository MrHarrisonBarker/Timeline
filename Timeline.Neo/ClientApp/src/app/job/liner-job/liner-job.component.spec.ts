import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinerJobComponent } from './liner-job.component';

describe('LinerJobComponent', () => {
  let component: LinerJobComponent;
  let fixture: ComponentFixture<LinerJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinerJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinerJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
