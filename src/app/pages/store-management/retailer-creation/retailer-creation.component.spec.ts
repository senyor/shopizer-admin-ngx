import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerCreationComponent } from './retailer-creation.component';

describe('RetailerCreationComponent', () => {
  let component: RetailerCreationComponent;
  let fixture: ComponentFixture<RetailerCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
