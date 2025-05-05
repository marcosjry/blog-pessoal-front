import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ChartComponent, 
  ApexDataLabels, ApexXAxis, ApexPlotOptions, 
  NgApexchartsModule} from "ng-apexcharts";
import { ChartService } from '../services/chart.service';
import { PostService } from '../../posts/service/post.service';
import { NgIf } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-users-chart',
  imports: [
    NgApexchartsModule,
    NgIf
  ],
  templateUrl: './users-chart.component.html',
  styleUrl: './users-chart.component.scss'
})
export class UsersChartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  listUserName: string[]= [];
  listQtd: number[] = [];

  @Output() isLoaded = new EventEmitter<void>();

  constructor(private service: ChartService, private postService: PostService) {
    this.chartOptions = {
      series: [
        {
          name: "Quantidade",
          data: this.listQtd
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.listUserName
      }
    };
  }

  ngOnInit(): void {
    this.service.getPostsInfoByUser().pipe()
      .subscribe({
        next: response => {
          response.forEach(item => {
            this.listQtd.push(item.qtd_posts);
            this.listUserName.push(item.usuario);
          })
          this.isLoaded.emit();
        },
        error: error => {
        }
      })
  }

}

