import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLandingPageComponent } from './store-landing-page.component';

describe('StoreLandingPageComponent', () => {
  let component: StoreLandingPageComponent;
  let fixture: ComponentFixture<StoreLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
