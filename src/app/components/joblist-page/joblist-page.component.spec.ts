import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistPageComponent } from './joblist-page.component';

describe('JoblistPageComponent', () => {
  let component: JoblistPageComponent;
  let fixture: ComponentFixture<JoblistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoblistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoblistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
