import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLabourComponent } from './products-labour.component';

describe('ProductsLabourComponent', () => {
  let component: ProductsLabourComponent;
  let fixture: ComponentFixture<ProductsLabourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsLabourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
