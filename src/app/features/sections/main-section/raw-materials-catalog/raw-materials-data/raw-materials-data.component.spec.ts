import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsDataComponent } from './raw-materials-data.component';

describe('RawMaterialsDataComponent', () => {
  let component: RawMaterialsDataComponent;
  let fixture: ComponentFixture<RawMaterialsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
