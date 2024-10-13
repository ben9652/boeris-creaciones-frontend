import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductDataComponent } from './mobile-product-data.component';

describe('MobileProductDataComponent', () => {
  let component: MobileProductDataComponent;
  let fixture: ComponentFixture<MobileProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileProductDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
