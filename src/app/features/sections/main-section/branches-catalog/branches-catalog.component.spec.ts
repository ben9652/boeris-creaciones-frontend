import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesCatalogComponent } from './branches-catalog.component';

describe('BranchesCatalogComponent', () => {
  let component: BranchesCatalogComponent;
  let fixture: ComponentFixture<BranchesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
