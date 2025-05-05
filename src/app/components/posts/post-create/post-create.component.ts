import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DinamicInputComponent } from '../../../shared/components/dinamic-input/dinamic-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Topic } from '../../topic/model/topic';
import { TopicService } from '../../topic/service/topic.service';
import { PostService } from '../service/post.service';
import { DinamicLoadingButtonComponent } from '../../../shared/components/dinamic-loading-button/dinamic-loading-button.component';
import { SharedService } from '../../../shared/services/shared.service';
import { Post } from '../../../home/models/Post';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-create',
  imports: [
    ReactiveFormsModule,
    DinamicInputComponent,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    DinamicLoadingButtonComponent
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {

  topicsSubject = new BehaviorSubject<Topic[]>([]);

  @Input() topics: Topic[] = [];
  @Output() refreshTopics = new EventEmitter<void>();
  @Input() mode: string = 'create';
  @Input() postToEdit!: Post;

  private topicRelation: Map<string, number> = new  Map<string, number>();

  postCreateForm!: FormGroup
  tituloControl!: FormControl;
  temaControl!: FormControl;
  textoControl!: FormControl;
  isLoading: boolean = false;
  @Input() actionButton: string = 'Criar Postagem'

  constructor(private fb: FormBuilder, 
    private topic: TopicService, 
    private service: PostService) {
    this.postCreateForm = this.fb.group({
      titulo: ['', Validators.required],
      tema: ['', Validators.required],
      texto: ['', Validators.required]
    })

    this.tituloControl = this.postCreateForm.get('titulo') as FormControl;
    this.textoControl = this.postCreateForm.get('texto') as FormControl;
    this.temaControl = this.postCreateForm.get('tema') as FormControl;
  }
  ngOnInit(): void {
    this.recebeTemas();
  
    if (this.mode === 'edit' && this.postToEdit) {
      this.tituloControl.setValue(this.postToEdit.titulo);
      this.textoControl.setValue(this.postToEdit.texto);
      this.temaControl.setValue(this.postToEdit.tema);
    }
  }

  recebeTemas() {
    this.topic.getAllTopic().subscribe(response => {
      this.topics = response
      this.topic.setTopicRelation(this.topics, this.topicRelation);
    })
  }

  onSubmit() {
    if (!this.postCreateForm.valid) return;

    this.isLoading = true;
    const { titulo, tema, texto } = this.postCreateForm.value;
    const temaId = Number(this.topicRelation.get(tema));

    console.log(temaId);
    setTimeout(() => {
      this.isLoading = false;
      this.mode === 'create'
      ? this.service.createPost({ titulo, temaId, texto})
      : this.service.updatePost(this.postToEdit!.id, { titulo, temaId, texto});
    }, 2000);
  }
  
}
