import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule} from './demo-material-module';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import 'hammerjs';


import { UserService } from './services/user.service';
import { ToastyModule } from 'ng2-toasty';
import { LoginGuard } from './gaurds/login.guard';
import { UserGuard } from './gaurds/user.guard';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { SafePipe } from './shared/alert/safe.pipe';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './pages/users/users.component';
import { AppHeaderComponent } from './pages/header/header.component';
import { AppSidebarComponent } from './pages/sidebar/sidebar.component';
import { LoginComponent } from './pages/login/login.component';
import { QusComponent } from './pages/qus/qus.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { QuestionService } from './services/question.service';
import { AlertService } from './shared/alert/alert.service';
import { ControlMessagesComponent } from './shared/components/ControlMessagesComponent';
import { EditQusComponent } from './pages/qus/edit-qus/edit-qus.component';
import { NewQusComponent } from './pages/qus/new-qus/new-qus.component';
import { ChangePassComponent } from './modals/change-pass/change-pass.component';
import { SppinnersComponent } from './sppinners/sppinners.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogService } from './services/blog.service';
import { EditBlogComponent } from './pages/blog/edit-blog/edit-blog.component';
import { ImageEditComponent } from './pages/blog/edit-blog/image-edit/image-edit.component';
import { ImgPreviewDirective } from './directives/img-preview.directive';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { CropperComponent } from './image-cropper/cropper/cropper.component';
import { CropperService } from './image-cropper/cropper.service';

@NgModule({
 
    declarations: [
      AppComponent,
      ControlMessagesComponent,
      CropperComponent,
      ImgPreviewDirective,
      UsersComponent, 
      AppHeaderComponent,
      SpinnerComponent,
      AppSidebarComponent,
      LoginComponent,
      AlertComponent,
      SafePipe,
      QusComponent,
      PagesComponent,
      EditQusComponent,
      NewQusComponent,
      ChangePassComponent,
      SppinnersComponent,
      BlogComponent,
      EditBlogComponent,
      ImageEditComponent,
      EditUserComponent
    ],
    entryComponents: [CropperComponent, ImageEditComponent],
    
    imports: [
      CommonModule,
      CdkTableModule,
      BrowserModule,
      BrowserAnimationsModule,
      DemoMaterialModule,
      FileUploadModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,  
      HttpClientModule,
      SharedModule, 
      AppRoutingModule, 
      ToastyModule.forRoot(),
      AgmCoreModule.forRoot({
        // please get your own API key here:
        // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
        apiKey: 'AIzaSyD8-yCdAAn9qWoMrEHu7s0BhsesVhv_kpY'
      })
     // RouterModule.forRoot(AppRoutes)  
    ],
    providers: [
      UserService,
      LoginGuard,
      UserGuard,
      QuestionService,
      CropperService,
      AlertService,
      BlogService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  