import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRawMaterialsComponent } from './list-raw-materials.component';

describe('ListRawMaterialsComponent', () => {
  let component: ListRawMaterialsComponent;
  let fixture: ComponentFixture<ListRawMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRawMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
