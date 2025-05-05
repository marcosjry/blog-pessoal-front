import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailGenericModalComponent } from './fail-generic-modal.component';

describe('FailGenericModalComponent', () => {
  let component: FailGenericModalComponent;
  let fixture: ComponentFixture<FailGenericModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailGenericModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailGenericModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
