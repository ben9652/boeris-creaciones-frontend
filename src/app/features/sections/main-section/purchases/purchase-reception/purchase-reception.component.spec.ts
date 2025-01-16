import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReceptionComponent } from './purchase-reception.component';

describe('PurchaseReceptionComponent', () => {
  let component: PurchaseReceptionComponent;
  let fixture: ComponentFixture<PurchaseReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseReceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
