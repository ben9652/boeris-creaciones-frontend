import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataFormComponent } from './product-data-form.component';

describe('ProductDataFormComponent', () => {
  let component: ProductDataFormComponent;
  let fixture: ComponentFixture<ProductDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
