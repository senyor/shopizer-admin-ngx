import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMarketingComponent } from './store-marketing.component';

describe('StoreMarketingComponent', () => {
  let component: StoreMarketingComponent;
  let fixture: ComponentFixture<StoreMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
