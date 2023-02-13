import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttInfoComponent } from './gantt-info.component';

describe('GanttInfoComponent', () => {
  let component: GanttInfoComponent;
  let fixture: ComponentFixture<GanttInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanttInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
