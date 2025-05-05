import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessGenericModalComponent } from './success-generic-modal.component';

describe('SuccessGenericModalComponent', () => {
  let component: SuccessGenericModalComponent;
  let fixture: ComponentFixture<SuccessGenericModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessGenericModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessGenericModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
