import { Component, EventEmitter, Output } from '@angular/core';
import { SearchableListCardComponent } from '../../../shared/components/searchable-list-card/searchable-list-card.component';
import { ListItemsComponent } from '../../../shared/components/list-items/list-items.component';
import { Post } from '../../../home/models/Post';
import { PostListService } from '../../../shared/services/post-list.service';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-users-post',
  imports: [
    SearchableListCardComponent,
    ListItemsComponent
  ],
  templateUrl: './users-post.component.html',
  styleUrl: './users-post.component.scss'
})
export class UsersPostComponent {

  postList: Post[] = [];
  isLoading: boolean = false;
  private userId: number;
  

  constructor(private postListService: PostListService, private login: LoginService) {
    this.userId = Number(this.login.getUserAuthenticated());
  }

  ngOnInit(): void {
    this.postListService.isLoading$.subscribe(loading => this.isLoading = loading);
    this.postListService.userPostList$.subscribe(userPosts => this.postList = userPosts);
    
    this.carregarUserPosts();
  }

  onSearch(query: string): void {
    this.postListService.searchOnUserPosts(query);
  }

  carregarUserPosts() {
    this.postListService.getPostsByUser(this.userId);
  }
}
