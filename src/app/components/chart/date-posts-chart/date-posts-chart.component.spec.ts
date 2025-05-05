import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePostsChartComponent } from './date-posts-chart.component';

describe('DatePostsChartComponent', () => {
  let component: DatePostsChartComponent;
  let fixture: ComponentFixture<DatePostsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePostsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePostsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
