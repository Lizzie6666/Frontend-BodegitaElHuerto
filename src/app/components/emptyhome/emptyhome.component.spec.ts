import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyhomeComponent } from './emptyhome.component';

describe('EmptyhomeComponent', () => {
  let component: EmptyhomeComponent;
  let fixture: ComponentFixture<EmptyhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
