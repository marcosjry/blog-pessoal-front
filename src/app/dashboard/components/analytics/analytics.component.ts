import { Component } from '@angular/core';
import { UsersChartComponent } from '../../../components/chart/users-chart/users-chart.component';
import { DatePostsChartComponent } from '../../../components/chart/date-posts-chart/date-posts-chart.component';
import { ChartService } from '../../../components/chart/services/chart.service';
import { PostService } from '../../../components/posts/service/post.service';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-analytics',
  imports: [
    UsersChartComponent,
    DatePostsChartComponent,
    NgIf,
    MatCardModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  totalPostagens: number = 0;
  listDate: string[] = []
  listQtd: number[] = []

  datePostsLoaded: boolean = false;
  usersPostsLoaded: boolean = false;

  constructor(private service: ChartService, private postService: PostService) {
    this.postService.getTotalPostsNumber().pipe().subscribe({
      next: response => {
        this.totalPostagens = response.total;
      },
      error: error => {
      }
    })
  }

  onChildloaded(toChange: boolean) {
    toChange = true;
  }



}
