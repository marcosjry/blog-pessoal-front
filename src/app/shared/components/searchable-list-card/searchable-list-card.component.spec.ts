import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableListCardComponent } from './searchable-list-card.component';

describe('SearchableListCardComponent', () => {
  let component: SearchableListCardComponent;
  let fixture: ComponentFixture<SearchableListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchableListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
