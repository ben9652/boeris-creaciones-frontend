import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsCatalogComponent } from './raw-materials-catalog.component';

describe('RawMaterialsCatalogComponent', () => {
  let component: RawMaterialsCatalogComponent;
  let fixture: ComponentFixture<RawMaterialsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
