import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSubsectionsComponent } from './banner-subsections.component';

describe('BannerSubsectionsComponent', () => {
  let component: BannerSubsectionsComponent;
  let fixture: ComponentFixture<BannerSubsectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSubsectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerSubsectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
