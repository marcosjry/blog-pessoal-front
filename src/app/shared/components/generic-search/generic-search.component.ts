import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DinamicInputComponent } from '../dinamic-input/dinamic-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-generic-search',
  imports: [
    DinamicInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './generic-search.component.html',
  styleUrl: './generic-search.component.scss'
})
export class GenericSearchComponent implements OnInit {

  @Input() label: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter();

  searchForm!: FormGroup
  texto!: FormControl

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      texto: ['', Validators.required]
    });
    this.texto = this.searchForm.get('texto') as FormControl;
  }

  ngOnInit(): void {
    // Implementa a busca automática com debounce para melhor experiência do usuário
    this.texto.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms após a última tecla pressionada
        distinctUntilChanged() // Evita buscas repetidas com o mesmo texto
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  onSubmit(): void {
    this.search.emit(this.texto.value);
  }
  
}


