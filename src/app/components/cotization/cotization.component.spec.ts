import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizationComponent } from './cotization.component';

describe('CotizationComponent', () => {
  let component: CotizationComponent;
  let fixture: ComponentFixture<CotizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
