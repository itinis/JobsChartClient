import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ADD_CHARTJOBS, TOGGLE_CHARTJOBS } from 'src/app/redux/actions';

import { ChartJobs } from 'src/app/Model/ChartJobs';
import { ChartJobsService } from 'src/app/services/chart-jobs.service';
import { IAppState } from 'src/app/redux/store';

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.css']
})
export class GoogleChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart_div') chart_div: ElementRef | undefined;
  dataJobsChartList: ChartJobs[] = [];
  arrayData: any;
  settStyle: string = "";
  jobsChartOptions: any;


  constructor(private chartJobsService: ChartJobsService, private ngRedux: NgRedux<IAppState>) {
    this.buildBasicGoogleChart();
    this.buildOptionsGoogleChart();
  }

  ngOnInit(): void {
    this.initDataToGoogleComboChart()
  }

  initDataToGoogleComboChart() {

    this.chartJobsService.getAlljobsChart().subscribe(dataJobsChart => {
     let isFirst=true;
      this.dataJobsChartList = dataJobsChart;
      let countjobsPerDay: number = 0, countjobsViews: number = 0, countpredictedJobs: number = 0,resultDate;
      this.dataJobsChartList.forEach(jobsChartElement => {
       
        const date = new Date(jobsChartElement.date);
        this.arrayData.push([date.toDateString(), countjobsPerDay += Number(jobsChartElement.jobsPerDay),
          countjobsViews += Number(jobsChartElement.jobsViews), countpredictedJobs += Number(jobsChartElement.predictedJobsViews)
          , this.settStyle]);
      });
      this.ngRedux.dispatch({type: ADD_CHARTJOBS, chartJobs: this.arrayData});
       this.drawGoogleChart();

    })
  }
  drawGoogleChart() {
   let arrayData= this.ngRedux.dispatch({ type: TOGGLE_CHARTJOBS, id: 0 });
    const data = google.visualization?.arrayToDataTable(this.arrayData);
    const chart = new google.visualization.ComboChart(this.chart_div?.nativeElement);
    chart.draw(data, this.jobsChartOptions);
  }

  buildBasicGoogleChart() {
    this.settStyle = 'fill-color: transpert; fill-opacity: 0.5; stroke-color: #76A7FA; stroke-width: 2;';
    this.arrayData = [['X', 'Active Jobs', 'Cumulative jobs view', 'Cumulative predicted jobs view', { role: 'style' }],
    ];
  }

  buildOptionsGoogleChart() {
    this.jobsChartOptions = {

      title: '',
      width: 900,
      height: 500,
      bars: 'horizontal',
      legend: { position: 'bottom' as const, alignment: 'center' },
      series: {
        0: { targetAxisIndex: 1, type: 'bars', color: 'rgb(220, 222, 217)', pointSize: 5 },
        1: { targetAxisIndex: 0, type: 'line', color: 'rgb(125, 203, 83)', pointSize: 5 },
        2: { targetAxisIndex: 0, type: 'line', lineDashStyle: [1, 1], color: '#76A7FA', pointSize: 7, pointColor: 'rgb(125, 203, 83)!important' },

      },
      chartArea: {
        bottom: 150
      },
     
      vAxes: {
        0: {
          title: 'jobs Views', viewWindow: { max: 1500 },
          ticks: [
            { v: 0, f: '0' },
            { v: 500, f: '500' },
            { v: 1000, f: '1000' },
            { v: 1500, f: '1500' }
          ]
        },
        1: {
          title: 'jobs', viewWindow: { max: 100 },
          ticks: [
            { v: 0, f: '0' },
            { v: 50, f: '50' },
            { v: 100, f: '100' }
          ]
        },
      },
      hAxis: {
        viewWindowMode: "explicit",
      },
      focusTarget: 'category'
    };
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
  }
}
