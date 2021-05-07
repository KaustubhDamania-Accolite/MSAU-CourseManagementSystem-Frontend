import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { Feedback } from 'src/app/Models/Feedback';
import { Skill } from 'src/app/Models/Skill';
import { TrainingMaterial } from 'src/app/Models/TrainingMaterial';
import { User } from 'src/app/Models/User';
import { CourseService } from 'src/app/services/course.service';
import { LoginService } from 'src/app/services/login.service';
import { UploadPopUpComponent } from '../upload-pop-up/upload-pop-up.component';
import { UploadSingleFilePopupComponent } from '../upload-single-file-popup/upload-single-file-popup.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  viewCourse: Course;
  skill: Skill[];
  feedback: Feedback[];
  newFeedback: Feedback = new Feedback();
  trainingMaterial: TrainingMaterial[];
  allPreviousVersions: TrainingMaterial[] = [];
  panelOpenState = false;
  flag = 0;
  loggedUser: User;
  isDisabled = false;

  constructor(private router: Router, private courseService: CourseService, public dialog: MatDialog, private loginService: LoginService) { }

  ngOnInit(): void {
      if(!localStorage.getItem('user')){
          this.router.navigate(['']);
          return;
      }
    // this.viewCourse = this.courseService.getViewCourse();
    this.viewCourse = JSON.parse(this.courseService.getCourseLocalStorage());
    console.log(this.viewCourse);
    this.courseService.setCourseId(this.viewCourse.courseId);
    console.log(this.viewCourse);
    console.log(Number(window.location.href.split('/')[window.location.href.split('/').length - 1]))


    this.newFeedback.courseId = this.viewCourse.courseId;

    this.courseService.getSkillsFromRemote(this.viewCourse.courseId).subscribe(
      resp => {
          this.skill = resp;
          console.log(resp)
      }
    );

    this.courseService.getFeedbackByCourseIdFromRemote(this.viewCourse.courseId).subscribe(
      resp => {this.feedback = resp;
      console.log(resp);}
    );

    this.courseService.getTrainingMaterial(this.viewCourse.courseId).subscribe(
      resp => {this.trainingMaterial = resp;
        console.log(resp);
        if(this.trainingMaterial[0] == null){
          this.isDisabled = true;
        }
      console.log(resp);


      for(let i = 0; i<this.trainingMaterial.length; i++){
        this.allPreviousVersions.push(new TrainingMaterial());
      }
      for(let i = 0; i<this.trainingMaterial.length; i++){
        // console.log(this.viewCourse.courseId);
        console.log(this.trainingMaterial[i]);
        this.courseService.getPreviousVersionTrainingMaterialFromRemote(this.viewCourse.courseId, this.trainingMaterial[i].materialId).subscribe(
          resp => {this.allPreviousVersions[i] = resp;
            console.log(this.allPreviousVersions);
            }
        );
      }


    }
    );



    // for(let i = 0; i<this.trainingMaterial.length; i++){
    //     this.courseService.getPreviousVersionTrainingMaterialFromRemote(this.viewCourse.courseId).subscribe(
    //       resp => {this.allPreviousVersions.push(resp);
    //         console.log(resp);}
    //     );
    //   }

    this.loginService.getUserByEmailFromRemote(JSON.parse(this.loginService.getUserId()).email).subscribe(
      resp => {
        if(resp.userId === this.viewCourse.userId){
          this.flag = 1;
        }
    }
    );

    this.loggedUser = JSON.parse(this.loginService.getUserId());
    // this.loginService.getUserByUserIdFromRemote(this.viewCourse.userId).subscribe(
    //   resp => {
    //     this.loggedUser = resp;
    //   }
    // );

  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.removeItem('user')
    });
    this.router.navigate(['']);
  }

  // console.log(viewCourse);

  onAddFeedBack() {
    this.newFeedback.participantName = JSON.parse(this.loginService.getUserId()).firstName;
    this.newFeedback.createdOn = new Date;
    if(this.newFeedback.feedbackText != "" && this.newFeedback.feedbackText != null){
    this.courseService.addFeedBackFromRemote(this.newFeedback).subscribe(
      resp => {console.log(resp);
      this.feedback.push(resp);}
    )
    this.newFeedback.feedbackText = "";
    }
    else{
      alert("You cannot add a blank feedback!!");
    }
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  downloadFile(data, fileType) {
    console.log(this.trainingMaterial);
    const byteArray = this.base64ToArrayBuffer(data);
    // console.log(data);
    const blob = new Blob([byteArray], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  openDialog(materialId: Number): void {

    this.courseService.setMaterialId(materialId);
    const dialogRef = this.dialog.open(UploadPopUpComponent, {
      width: '300px',
      // data: {materialId: materialId}
    });

    // this.courseService.setEditCourse(course);

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      window.location.reload();

      // this.courseName = result;
    });
  }

  deleteMaterial(materialId: Number){
    console.log(this.viewCourse);
    this.courseService.deleteMaterialFromRemote(materialId).subscribe(
      resp => {console.log("Deleted the material!");}
    );
    window.location.reload();
  }

  openDialog1(): void {

    // this.courseService.setMaterialId(materialId);
    const dialogRef = this.dialog.open(UploadSingleFilePopupComponent, {
      width: '300px',
      // data: {materialId: materialId}
    });

    // this.courseService.setEditCourse(course);

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      window.location.reload();
      // this.courseName = result;
    });
  }


}
