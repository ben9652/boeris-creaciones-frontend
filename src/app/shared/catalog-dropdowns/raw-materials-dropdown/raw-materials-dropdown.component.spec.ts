import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsDropdownComponent } from './raw-materials-dropdown.component';

describe('RawMaterialsDropdownComponent', () => {
  let component: RawMaterialsDropdownComponent;
  let fixture: ComponentFixture<RawMaterialsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
