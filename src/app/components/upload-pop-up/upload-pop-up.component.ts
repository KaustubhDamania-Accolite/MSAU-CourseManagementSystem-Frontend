import { Component, OnInit } from '@angular/core';
import { TrainingMaterial } from 'src/app/Models/TrainingMaterial';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-upload-pop-up',
  templateUrl: './upload-pop-up.component.html',
  styleUrls: ['./upload-pop-up.component.scss']
})
export class UploadPopUpComponent implements OnInit {

  trainingMaterial: TrainingMaterial = new TrainingMaterial();
  files: any;
  fileAttr = 'Choose File';
  blob: Blob;
  materialId: Number;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  onFileChanged(event){
    // this.files = event.target.files[0];
    this.files = event;
    console.log(this.files);
    console.log(this.files.type);
    this.trainingMaterial.fileName = this.files.name;
    this.fileAttr = this.trainingMaterial.fileName;
    this.trainingMaterial.fileType = this.files.type;
    // this.blob = new Blob(this.files, {});
    // this.trainingMaterial.fileData = this.files;
    // this.blob = new Blob(this.files);
    // const uploadFileData = new FormData();
    // uploadFileData.append('file', this.files, this.files.name);
  }

  onAddMaterial() {
    this.materialId = this.courseService.getMaterialId();
    console.log(this.materialId);
    this.courseService.addTrainingMaterialfromRemote(this.materialId, this.courseService.getCourseId(), this.trainingMaterial.fileType, this.trainingMaterial.fileName, this.files).subscribe(
      resp => {console.log(resp);}
    )
    console.log(this.trainingMaterial);
  }

}
