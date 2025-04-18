import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicInputComponent } from './dinamic-input.component';

describe('DinamicInputComponent', () => {
  let component: DinamicInputComponent;
  let fixture: ComponentFixture<DinamicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
