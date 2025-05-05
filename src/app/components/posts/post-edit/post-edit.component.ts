import { Component, OnInit } from '@angular/core';
import { PostCreateComponent } from '../post-create/post-create.component';
import { Post } from '../../../home/models/Post';
import { PostService } from '../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-edit',
  imports: [
    PostCreateComponent,
    MatError,
    NgIf,
    MatCardModule
  ],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss'
})
export class PostEditComponent implements OnInit {

  post!: Post;
  postId!: number;
  onError: boolean = false;
  message: string = '';

  constructor(private service: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getPost(this.postId).pipe().subscribe({
      next: response => {
        this.post = response;
      },
      error: error => {
        this.message = error.error;
        this.onError = true;
      }
    })
  }


}
