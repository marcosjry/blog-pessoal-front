import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { ChartService } from '../services/chart.service';
import { PostService } from '../../posts/service/post.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-date-posts-chart',
  imports: [
    NgApexchartsModule,
    NgIf
  ],
  templateUrl: './date-posts-chart.component.html',
  styleUrl: './date-posts-chart.component.scss'
})


export class DatePostsChartComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  listDate: string[] = []
  listQtd: number[] = []
  @Output() isLoaded = new EventEmitter<void>();

  constructor(private service: ChartService) {
    this.chartOptions = {
      series: [
        {
          name: "Quantidade de Posts",
          data: this.listQtd
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.listDate
      }
    };
  }
  ngOnInit(): void {
    this.service.getPostsInfoByDate().pipe()
      .subscribe({
        next: response => {
          response.forEach(item => {
            this.listQtd.push(item.qtd_postagens);
            this.listDate.push(item.data);
          })
          this.isLoaded.emit();
        },
        error: error => {
        }
      })
  }
}
