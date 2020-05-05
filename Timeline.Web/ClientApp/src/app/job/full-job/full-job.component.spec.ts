import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullJobComponent } from './full-job.component';

describe('FullJobComponent', () => {
  let component: FullJobComponent;
  let fixture: ComponentFixture<FullJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
