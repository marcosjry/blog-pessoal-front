import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DinamicInputComponent } from '../../../shared/components/dinamic-input/dinamic-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicService } from '../service/topic.service';
import { DinamicLoadingButtonComponent } from '../../../shared/components/dinamic-loading-button/dinamic-loading-button.component';
import { NgIf } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-topic-create',
  imports: [
    ReactiveFormsModule,
    DinamicInputComponent,
    DinamicLoadingButtonComponent,
    NgIf,
    MatError
  ],
  templateUrl: './topic-create.component.html',
  styleUrl: './topic-create.component.scss'
})
export class TopicCreateComponent implements OnInit {

  topicForm!: FormGroup
  topicControl!: FormControl
  isLoading: boolean = false;
  createError: boolean = false;
  messageError: string = '';

  @Output() temaCriado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private service: TopicService,
    private shared: SharedService
  ) {

    this.topicForm = this.fb.group({
      descricao: ['', Validators.required]
    })
    this.topicControl = this.topicForm.get('descricao') as FormControl
  }
  ngOnInit(): void {
  }


  onSubmit() {
    if(!this.topicForm.valid) return;

    this.isLoading = true

    this.service.createTopic(this.topicForm.value).pipe().subscribe({
      
      next: response => {
        setTimeout(() => {
          this.shared.openSuccessDialog('Tema', 'criado');
          this.isLoading = false;
          this.temaCriado.emit()
        }, 1500);
      },
      error: error => {
        setTimeout(() => {
          this.isLoading = false;
          this.createError = true;
          let message = error?.error || 'Erro desconhecido';
          this.messageError = message;
        }, 1500)
      }
    });
  }
}
