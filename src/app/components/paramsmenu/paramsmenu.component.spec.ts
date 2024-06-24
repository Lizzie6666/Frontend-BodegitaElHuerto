import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsmenuComponent } from './paramsmenu.component';

describe('ParamsmenuComponent', () => {
  let component: ParamsmenuComponent;
  let fixture: ComponentFixture<ParamsmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamsmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
