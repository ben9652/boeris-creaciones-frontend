import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePartnerAdditionComponent } from './mobile-partner-addition.component';

describe('MobilePartnerAdditionComponent', () => {
  let component: MobilePartnerAdditionComponent;
  let fixture: ComponentFixture<MobilePartnerAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilePartnerAdditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePartnerAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
