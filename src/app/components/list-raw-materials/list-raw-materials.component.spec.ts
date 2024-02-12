import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRawMaterialsComponent } from './list-raw-materials.component';

describe('ListRawMaterialsComponent', () => {
  let component: ListRawMaterialsComponent;
  let fixture: ComponentFixture<ListRawMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRawMaterialsComponent]
    });
    fixture = TestBed.createComponent(ListRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
