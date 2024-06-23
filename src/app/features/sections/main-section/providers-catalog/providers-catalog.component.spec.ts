import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersCatalogComponent } from './providers-catalog.component';

describe('ProvidersCatalogComponent', () => {
  let component: ProvidersCatalogComponent;
  let fixture: ComponentFixture<ProvidersCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
