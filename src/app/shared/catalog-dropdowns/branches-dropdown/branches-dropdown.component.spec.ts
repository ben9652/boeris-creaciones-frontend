import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesDropdownComponent } from './branches-dropdown.component';

describe('BranchesDropdownComponent', () => {
  let component: BranchesDropdownComponent;
  let fixture: ComponentFixture<BranchesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
