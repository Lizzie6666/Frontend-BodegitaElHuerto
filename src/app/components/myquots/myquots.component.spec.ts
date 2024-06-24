import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquotsComponent } from './myquots.component';

describe('MyquotsComponent', () => {
  let component: MyquotsComponent;
  let fixture: ComponentFixture<MyquotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyquotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyquotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
