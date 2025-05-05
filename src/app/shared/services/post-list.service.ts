import { Injectable } from '@angular/core';
import { Post } from '../../home/models/Post';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../components/posts/service/post.service';
import { LoginService } from '../../auth/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  private baseUrl: string = 'http://localhost:8080/api/postagens'

  private allPosts: Post[] = [];
  private userPosts: Post[] = [];

  private postListSubject = new BehaviorSubject<Post[]>([]);
  postList$ = this.postListSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  private userPostListSubject = new BehaviorSubject<Post[]>([]);
  userPostList$ = this.userPostListSubject.asObservable();

  constructor(private homeService: PostService, private http: HttpClient) {}

  loadPosts(filterFn?: (post: Post) => boolean): void {
    this.loadingSubject.next(true);
    this.homeService.getPostList().subscribe({
      next: (response) => {
        setTimeout(()=> {
          this.allPosts = filterFn ? response.filter(filterFn) : response;
          this.postListSubject.next([...this.allPosts]);
          this.loadingSubject.next(false);
        }, 2000)
      },
      error: () => {
        setTimeout(() => {
          this.postListSubject.next([]);
          this.loadingSubject.next(false);
        }, 2000)
      }
    });
  }

  search(query: string): void {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const lowerQuery = query.trim().toLowerCase();
      if (!lowerQuery) {
        this.postListSubject.next([...this.allPosts]);
        this.loadingSubject.next(false);
        return;
      }
  
      const filtered = this.allPosts.filter(post =>
        (post.tema && post.tema.toLowerCase().includes(lowerQuery)) ||
        (post.usuario && post.usuario.toLowerCase().includes(lowerQuery)) ||
        (post.titulo && post.titulo.toLowerCase().includes(lowerQuery))
      );
  
      this.postListSubject.next(filtered);
      this.loadingSubject.next(false);
    }, 2000)
  }

  searchOnUserPosts(query: string): void {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const lowerQuery = query.trim().toLowerCase();
      if (!lowerQuery) {
        this.userPostListSubject.next([...this.userPosts]);
        this.loadingSubject.next(false);
        return;
      }

      const filtered = this.userPosts.filter(post =>
        (post.tema && post.tema.toLowerCase().includes(lowerQuery)) ||
        (post.usuario && post.usuario.toLowerCase().includes(lowerQuery)) ||
        (post.titulo && post.titulo.toLowerCase().includes(lowerQuery)) ||
        (post.dataPostagem && post.dataPostagem.toLowerCase().includes(lowerQuery)) 
      );

      this.userPostListSubject.next(filtered);
      this.loadingSubject.next(false);
    }, 2000)
  }

  getPostsByUser(userId: number) {
    this.loadingSubject.next(true);
    this.http.get<Post[]>(`${this.baseUrl}/filtro?autor=${userId}`).pipe().subscribe({
      next: response => {
        setTimeout(() => {
          this.userPostListSubject.next([...response]);
          this.userPosts = response;
          this.loadingSubject.next(false);
        }, 2000)
      },
      error: error => {
        setTimeout(() => {
          this.loadingSubject.next(false);
        }, 2000)
      }
    });
  }
}
