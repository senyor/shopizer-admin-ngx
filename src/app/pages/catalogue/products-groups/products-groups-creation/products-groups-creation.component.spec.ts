import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGroupsCreationComponent } from './products-groups-creation.component';

describe('ProductsGroupsCreationComponent', () => {
  let component: ProductsGroupsCreationComponent;
  let fixture: ComponentFixture<ProductsGroupsCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsGroupsCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsGroupsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
