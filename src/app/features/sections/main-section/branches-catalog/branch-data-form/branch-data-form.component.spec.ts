import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDataFormComponent } from './branch-data-form.component';

describe('BranchesDataFormComponent', () => {
  let component: BranchDataFormComponent;
  let fixture: ComponentFixture<BranchDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
