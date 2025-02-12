import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesHeaderComponent } from './purchases-header.component';

describe('PurchasesHeaderComponent', () => {
  let component: PurchasesHeaderComponent;
  let fixture: ComponentFixture<PurchasesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
