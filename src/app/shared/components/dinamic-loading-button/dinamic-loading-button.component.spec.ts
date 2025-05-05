import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicLoadingButtonComponent } from './dinamic-loading-button.component';

describe('DinamicLoadingButtonComponent', () => {
  let component: DinamicLoadingButtonComponent;
  let fixture: ComponentFixture<DinamicLoadingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicLoadingButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicLoadingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
