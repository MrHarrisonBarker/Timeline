import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickJobComponent } from './quick-job.component';

describe('QuickJobComponent', () => {
  let component: QuickJobComponent;
  let fixture: ComponentFixture<QuickJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
