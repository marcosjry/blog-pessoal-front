import { Component, OnInit } from '@angular/core';
import { Post } from '../../../home/models/Post';
import { PostService } from '../service/post.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [
    MatCardModule,
    NgIf
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent  implements OnInit {

  post!: Post;
  id!: number;
  constructor(private service: PostService, private route: ActivatedRoute) {
   
  }

  formatDate(date: string) {
    return this.service.formatDate(date);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.service.getPost(this.id).pipe().subscribe({
      next: response => {
        this.post = response;
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
