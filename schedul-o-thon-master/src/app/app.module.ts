import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyPages/login/login.component';
import { HomeComponent } from './MyPages/home/home.component';
import { NavbarComponent } from './sharePages/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from 'D:/educational/schedulo/scheduloApp/src/app/auth.service';
import { AdminViewComponent } from './MyPages/admin-view/admin-view.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { InstructorViewComponent } from './MyPages/instructor-view/instructor-view.component';
import { TraineeViewComponent } from './MyPages/trainee-view/trainee-view.component';
import { EventsComponent } from './MyPages/instructor-view/events/events.component';
import {SubBatchComponent} from './MyPages/sub-batch/sub-batch.component';
import { SectionComponent } from './MyPages/section/section.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AdminViewComponent,
    InstructorViewComponent,
    TraineeViewComponent,
    EventsComponent,
    SubBatchComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule],
  providers: [AuthService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
