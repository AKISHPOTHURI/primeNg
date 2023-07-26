import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodefirstComponent } from './codefirst.component';

describe('CodefirstComponent', () => {
  let component: CodefirstComponent;
  let fixture: ComponentFixture<CodefirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodefirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodefirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
