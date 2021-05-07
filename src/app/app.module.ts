import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocialAuthService } from "angularx-social-login"
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CourseComponent } from './components/course/course.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import {MatTableModule} from '@angular/material/table';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditPopUpComponent } from './components/edit-pop-up/edit-pop-up.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { UploadPopUpComponent } from './components/upload-pop-up/upload-pop-up.component';
import { TrendsComponent } from './components/trends/trends.component';
import { MatSelectModule } from '@angular/material/select';
import { UploadSingleFilePopupComponent } from './components/upload-single-file-popup/upload-single-file-popup.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    HomeComponent,
    CourseComponent,
    ViewCourseComponent,
    EditCourseComponent,
    EditPopUpComponent,
    CourseDetailsComponent,
    UploadPopUpComponent,
    TrendsComponent,
    UploadSingleFilePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [SocialAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
