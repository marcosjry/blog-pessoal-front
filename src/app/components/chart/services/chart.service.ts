import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostsByDate } from '../models/posts-by-date';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostsByUser } from '../models/posts-by-user';
import { Post } from '../../../home/models/Post';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:8080/stats'

  private lastPostsSubject = new BehaviorSubject<Post[]>([]);
  lastPosts$ = this.lastPostsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getPostsInfoByDate(): Observable<PostsByDate[]> {
    return this.http.get<PostsByDate[]>(`${this.baseUrl}/posts-by-date`);
  }

  getPostsInfoByUser(): Observable<PostsByUser[]> {
    return this.http.get<PostsByUser[]>(`${this.baseUrl}/posts-per-user`);
  }

  getLastPosts() {
    this.http.get<Post[]>(`${this.baseUrl}/last-posts`).subscribe({
      next: response => {
        this.lastPostsSubject.next(response);
      },
      error: error => {
        console.log(error);
      }
    })
  }
  
}
