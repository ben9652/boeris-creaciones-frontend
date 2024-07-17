import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAdditionComponent } from './partner-addition.component';

describe('PartnerAdditionComponent', () => {
  let component: PartnerAdditionComponent;
  let fixture: ComponentFixture<PartnerAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerAdditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
