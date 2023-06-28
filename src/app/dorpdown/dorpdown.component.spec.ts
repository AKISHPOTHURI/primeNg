import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DorpdownComponent } from './dorpdown.component';

describe('DorpdownComponent', () => {
  let component: DorpdownComponent;
  let fixture: ComponentFixture<DorpdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DorpdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DorpdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
