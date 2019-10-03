import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueCreationComponent } from './catalogue-creation.component';

describe('CatalogueCreationComponent', () => {
  let component: CatalogueCreationComponent;
  let fixture: ComponentFixture<CatalogueCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
