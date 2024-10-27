import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBranchDataComponent } from './mobile-branch-data.component';

describe('MobileBranchDataComponent', () => {
  let component: MobileBranchDataComponent;
  let fixture: ComponentFixture<MobileBranchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileBranchDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileBranchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
