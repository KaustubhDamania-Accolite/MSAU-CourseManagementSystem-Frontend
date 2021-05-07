import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  dataSource: any;
  displayedColumns: String[] = ['id', 'courseName', 'feedbackCount'];

  dataSource1: any;
  displayedColumns1: String[] = ['id', 'courseName', 'avgRating'];

  BarChart: any;
  labels = [];
  data = [];
  color = [];

  BarChart1: any;
  labels1 = [];
  data1 = [];

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('user')){
       this.router.navigate(['']);
       return;
    }
    this.courseService.getFeedbackCountFromRemote().subscribe(
      resp => {
        this.dataSource = resp;
        console.log(this.dataSource);
        for(let i = 0; i<this.dataSource.length; i++){
          this.labels.push(this.dataSource[i].courseName);
          this.data.push(this.dataSource[i].count);
          this.color.push("#3F51B5");
        }
        }
    );

    this.BarChart = new Chart('barchart',{
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: "Feedback Trends",
          data: this.data,
          backgroundColor: this.color
        }]
      }
    });

    this.courseService.getAverageRatingFromRemote().subscribe(
      resp => {
        this.dataSource1 = resp;
        console.log(this.dataSource1);
        for(let i = 0; i<this.dataSource1.length; i++){
          this.labels1.push(this.dataSource1[i].courseName);
          this.data1.push(this.dataSource1[i].avgRating);
          this.color.push("#3F51B5");
        }

        console.log(this.labels1);
      }
    );

    this.BarChart1 = new Chart('barchart1',{
      type: 'bar',
      data: {
        labels: this.labels1,
        datasets: [{
          label: "Average Rating Trends",
          data: this.data1,
          backgroundColor: this.color
        }]
      }
    });





  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('user')
    });
    this.router.navigate(['']);
  }

}
