import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrls: ['./edit-pop-up.component.scss']
})
export class EditPopUpComponent implements OnInit {

  course: Course = new Course();

  editCourse: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  onEdit() {
    if(this.course.courseName != "" && this.course.courseName != null && this.course.courseDescription != "" && this.course.courseDescription != null && this.course.prerequisite != "" && this.course.prerequisite != null){
      this.editCourse = this.courseService.getEditCourse();
      console.log(this.editCourse);
      this.editCourse.courseName = this.course.courseName;
      this.editCourse.courseDescription = this.course.courseDescription;
      this.editCourse.prerequisite = this.course.prerequisite;
      console.log(this.editCourse);
      this.courseService.editDetails(this.editCourse).subscribe(resp => {
        console.log(resp);
      })

      console.log(this.editCourse);
    }
    else{
      alert('Please fill all the fields!');
    }

  }

}
