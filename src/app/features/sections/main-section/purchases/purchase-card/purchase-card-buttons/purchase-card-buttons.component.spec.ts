import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCardButtonsComponent } from './purchase-card-buttons.component';

describe('PurchaseCardButtonsComponent', () => {
  let component: PurchaseCardButtonsComponent;
  let fixture: ComponentFixture<PurchaseCardButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseCardButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCardButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
