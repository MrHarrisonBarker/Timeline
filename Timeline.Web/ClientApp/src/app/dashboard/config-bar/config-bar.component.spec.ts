import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBarComponent } from './config-bar.component';

describe('ConfigBarComponent', () => {
  let component: ConfigBarComponent;
  let fixture: ComponentFixture<ConfigBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
