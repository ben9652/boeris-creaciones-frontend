import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialDataFormComponent } from './raw-material-data-form.component';

describe('RawMaterialDataFormComponent', () => {
  let component: RawMaterialDataFormComponent;
  let fixture: ComponentFixture<RawMaterialDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
