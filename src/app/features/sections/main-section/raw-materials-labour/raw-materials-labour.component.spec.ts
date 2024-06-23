import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsLabourComponent } from './raw-materials-labour.component';

describe('RawMaterialsLabourComponent', () => {
  let component: RawMaterialsLabourComponent;
  let fixture: ComponentFixture<RawMaterialsLabourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsLabourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsLabourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
