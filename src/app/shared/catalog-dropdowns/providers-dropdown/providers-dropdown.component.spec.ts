import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersDropdownComponent } from './providers-dropdown.component';

describe('ProvidersDropdownComponent', () => {
  let component: ProvidersDropdownComponent;
  let fixture: ComponentFixture<ProvidersDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
