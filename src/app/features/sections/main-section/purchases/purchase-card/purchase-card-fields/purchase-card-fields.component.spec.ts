import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCardFieldsComponent } from './purchase-card-fields.component';

describe('PurchaseCardFieldsComponent', () => {
  let component: PurchaseCardFieldsComponent;
  let fixture: ComponentFixture<PurchaseCardFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCardFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCardFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
