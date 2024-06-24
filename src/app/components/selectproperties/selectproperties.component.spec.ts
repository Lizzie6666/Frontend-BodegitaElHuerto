import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectpropertiesComponent } from './selectproperties.component';

describe('SelectpropertiesComponent', () => {
  let component: SelectpropertiesComponent;
  let fixture: ComponentFixture<SelectpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectpropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
