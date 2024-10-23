import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProviderDataComponent } from './mobile-provider-data.component';

describe('MobileProviderDataComponent', () => {
  let component: MobileProviderDataComponent;
  let fixture: ComponentFixture<MobileProviderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileProviderDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileProviderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
