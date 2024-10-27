import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityModalComponent } from './locality-modal.component';

describe('LocalityModalComponent', () => {
  let component: LocalityModalComponent;
  let fixture: ComponentFixture<LocalityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
