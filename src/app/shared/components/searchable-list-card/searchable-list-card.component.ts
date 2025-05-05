import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericSearchComponent } from '../generic-search/generic-search.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-searchable-list-card',
  imports: [
    MatCardModule,
    NgIf,
    GenericSearchComponent,
    MatProgressSpinner
  ],
  templateUrl: './searchable-list-card.component.html',
  styleUrl: './searchable-list-card.component.scss'
})
export class SearchableListCardComponent {
  @Input() title = 'Lista';
  @Input() items: any[] = [];
  @Input() isLoading = false;
  @Input() emptyMessage = 'Nenhum item encontrado.';

  @Output() onSearch = new EventEmitter<string>();
}
