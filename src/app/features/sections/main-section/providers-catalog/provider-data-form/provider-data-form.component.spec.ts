import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDataFormComponent } from './provider-data-form.component';

describe('ProviderDataFormComponent', () => {
  let component: ProviderDataFormComponent;
  let fixture: ComponentFixture<ProviderDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
