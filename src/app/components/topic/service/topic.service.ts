import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from '../model/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl: string = 'http://localhost:8080/api/temas'
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
