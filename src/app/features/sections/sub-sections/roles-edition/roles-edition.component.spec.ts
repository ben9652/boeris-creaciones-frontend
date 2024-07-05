import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesEditionComponent } from './roles-edition.component';

describe('RolesEditionComponent', () => {
  let component: RolesEditionComponent;
  let fixture: ComponentFixture<RolesEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
