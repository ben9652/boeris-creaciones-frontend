import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDropdownComponent } from './products-dropdown.component';

describe('ProductsDropdownComponent', () => {
  let component: ProductsDropdownComponent;
  let fixture: ComponentFixture<ProductsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
