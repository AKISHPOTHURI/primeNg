import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimecurdComponent } from './primecurd.component';

describe('PrimecurdComponent', () => {
  let component: PrimecurdComponent;
  let fixture: ComponentFixture<PrimecurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimecurdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimecurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
