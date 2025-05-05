import { Component, signal } from '@angular/core';
import { TopicService } from '../../topic/service/topic.service';
import { Topic } from '../../topic/model/topic';
import { TopicCreateComponent } from '../../topic/topic-create/topic-create.component';
import { PostCreateComponent } from '../post-create/post-create.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-create-page',
  imports: [
    PostCreateComponent,
    TopicCreateComponent,
    MatExpansionModule,
    MatCardModule
  ],
  templateUrl: './post-create-page.component.html',
  styleUrl: './post-create-page.component.scss'
})
export class PostCreatePageComponent {
  topics: Topic[] = [];
  criarTema: boolean = false;
  readonly panelOpenState = signal(false);

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.buscarTemas();
  }

  buscarTemas() {
    this.topicService.getAllTopic().subscribe(response => {
      this.topics = response;
    });
  }

  onTemaCriado() {
    this.criarTema = false;
    this.buscarTemas(); // atualiza lista de temas
  }

}
