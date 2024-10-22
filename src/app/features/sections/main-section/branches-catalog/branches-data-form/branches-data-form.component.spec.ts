import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesDataFormComponent } from './branches-data-form.component';

describe('BranchesDataFormComponent', () => {
  let component: BranchesDataFormComponent;
  let fixture: ComponentFixture<BranchesDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
