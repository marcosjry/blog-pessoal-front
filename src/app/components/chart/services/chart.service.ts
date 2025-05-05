import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostsByDate } from '../models/posts-by-date';
import { Observable } from 'rxjs';
import { PostsByUser } from '../models/posts-by-user';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:8080/stats'
  constructor(
    private http: HttpClient
  ) { }

  getPostsInfoByDate(): Observable<PostsByDate[]> {
    return this.http.get<PostsByDate[]>(`${this.baseUrl}/posts-by-date`);
  }

  getPostsInfoByUser(): Observable<PostsByUser[]> {
    return this.http.get<PostsByUser[]>(`${this.baseUrl}/posts-per-user`);
  }
}
