import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRawMaterialDataComponent } from './mobile-raw-material-data.component';

describe('MobileRawMaterialDataComponent', () => {
  let component: MobileRawMaterialDataComponent;
  let fixture: ComponentFixture<MobileRawMaterialDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileRawMaterialDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileRawMaterialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
