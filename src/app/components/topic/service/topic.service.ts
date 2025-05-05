import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseUrl: string = 'https://blog-pessoal-production.up.railway.app/api/temas'
  constructor(private http: HttpClient) { }

  getAllTopic() {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  createTopic(topic: { descricao: string}) {
    return this.http.post(this.baseUrl, topic)
  }

  setTopicRelation(posts: Topic[], relation: Map<string, number>) {
    posts.map(value => {
      relation.set(value.descricao, value.id);
    })  
  }
}
