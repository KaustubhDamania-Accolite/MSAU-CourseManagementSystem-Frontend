import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';
import { EditPopUpComponent } from '../edit-pop-up/edit-pop-up.component';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  dataSource: any;
  displayedColumns: String[] = ['id', 'title', 'description', 'prerequisite', 'createdOn', 'view', 'edit', 'delete'];

  courseName: String;
  courseDescription: String;

  constructor(private router: Router, private courseService: CourseService, public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getUserByEmailFromRemote(JSON.parse(this.loginService.getUserId()).email).subscribe(
      resp => {this.courseService.getCourseByUserIdFromRemote(resp.userId).subscribe(
        resp => {console.log(resp);
          this.dataSource = new MatTableDataSource(resp);}
      )}
    )
    // this.courseService.viewAllCoursesFromRemote().subscribe(
    //   resp => {this.dataSource = resp;
    //   console.log(this.dataSource);}
    // )
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2.currentUser)
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('user')
    });
    this.router.navigate(['']);
  }

  openDialog(course): void {
    const dialogRef = this.dialog.open(EditPopUpComponent, {
      width: '300px',
      data: {courseName: this.courseName, courseDescription: this.courseDescription}
    });

    this.courseService.setEditCourse(course);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.courseName = result;
    });
  }

  onDelete(course){
    this.courseService.deleteCourse(course.courseId).subscribe(
      resp => {console.log(resp);}
    )
    window.location.reload();
  }

  showDetails(element) {
    console.log(element);
    this.courseService.setViewCourse(element);
    this.courseService.setCourseLocalStorage(element);
    this.router.navigate(['/viewCourseDetails',element.courseId]);
  }

  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
