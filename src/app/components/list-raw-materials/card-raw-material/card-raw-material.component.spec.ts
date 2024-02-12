import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRawMaterialComponent } from './card-raw-material.component';

describe('CardRawMaterialComponent', () => {
  let component: CardRawMaterialComponent;
  let fixture: ComponentFixture<CardRawMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRawMaterialComponent]
    });
    fixture = TestBed.createComponent(CardRawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
