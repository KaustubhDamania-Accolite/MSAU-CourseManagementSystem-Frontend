import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  dataSource: any;
  displayedColumns: String[] = ['id', 'title', 'description', 'prerequisite', 'createdOn','view'];

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    console.log(!localStorage.getItem('user'), 'check');

    if(!localStorage.getItem('user')){
        this.router.navigate(['']);
        return;
    }
    this.courseService.viewAllCoursesFromRemote().subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
      console.log(this.dataSource);}
    )
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('user')
    });
    this.router.navigate(['']);
  }

  showDetails(element) {
    console.log(element);
    this.courseService.setViewCourse(element);
    this.courseService.setCourseLocalStorage(element);
    // console.log(this.courseService.getCourseLocalStorage());
    this.router.navigate(['/viewCourseDetails', element.courseId]);
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
