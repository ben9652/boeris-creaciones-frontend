import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsDiscarderComponent } from './objects-discarder.component';

describe('ObjectsDiscarderComponent', () => {
  let component: ObjectsDiscarderComponent;
  let fixture: ComponentFixture<ObjectsDiscarderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectsDiscarderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectsDiscarderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
