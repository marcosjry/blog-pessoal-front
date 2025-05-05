import { Component, OnInit } from '@angular/core';
import { Post } from './models/Post';
import { ListItemsComponent } from '../shared/components/list-items/list-items.component';
import { CommonModule } from '@angular/common';
import { SearchableListCardComponent } from '../shared/components/searchable-list-card/searchable-list-card.component';
import { PostService } from '../components/posts/service/post.service';
import { PostListService } from '../shared/services/post-list.service';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SearchableListCardComponent,
    ListItemsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  postList: Post[] = [];
  isLoading = false;
  userId: string = '';

  constructor(private postListService: PostListService, private postService: PostService) {}

  ngOnInit(): void {
    this.postListService.postList$.subscribe(list => this.postList = list);
    this.postListService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.userId = '...'; // Buscar do authService
    this.postListService.loadPosts();
  }

  onSearch(query: string): void {
    this.postListService.search(query);
  }
}
