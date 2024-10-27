import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityManagerComponent } from './locality-manager.component';

describe('LocalityManagerComponent', () => {
  let component: LocalityManagerComponent;
  let fixture: ComponentFixture<LocalityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalityManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
