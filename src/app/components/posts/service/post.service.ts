import { Injectable } from '@angular/core';
import { PostToCreate } from '../model/PostToCreate';
import { HttpClient } from '@angular/common/http';

import { Post } from '../../../home/models/Post';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = []

  private baseUrl: string = 'https://blog-pessoal-production.up.railway.app'

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  createPost(toCreate: PostToCreate) {
    return this.http.post(`${this.baseUrl}/api/postagens`, toCreate).subscribe({
      next: response => {
          this.sharedService.openSuccessDialog('Postagem', 'criada');
      },
      error: error => {
          this.sharedService.openFailDialog('Erro ao criar postagem', error.error);
      }
    });;
  }

  getPostList() {
    return this.http.get<Post[]>(`${this.baseUrl}/api/postagens`);
  }

  getPost(id: number){
    return this.http.get<Post>(`${this.baseUrl}/api/postagens/${id}`);
  }

  deletePost(id: number){
    return this.http.delete(`${this.baseUrl}/api/postagens/${id}`);
  }

  updatePost(id: number, data: { titulo: string; temaId: number; texto: string }) {
    return this.http.put(`${this.baseUrl}/api/postagens/${id}`, data).pipe().subscribe({
      next: response => {
          this.sharedService.openSuccessDialog('Post', 'atualizado')
      },
      error: error => {
          this.sharedService.openSuccessDialog('Falha na atualização', error.error)
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return formatter.format(date);
  }

  setAutors(posts: Post[], autorPosts: Map<string, number>) {
    posts.map(value => {
      autorPosts.set(value.usuario, value.usuarioId)
    })
  }

  getTotalPostsNumber() {
    return this.http.get<{total: number}>(`${this.baseUrl}/stats/total-posts`);
  }
}
