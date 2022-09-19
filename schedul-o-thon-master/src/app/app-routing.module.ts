import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MyPages/home/home.component';
import { LoginComponent } from './MyPages/login/login.component';
import {AdminViewComponent} from './MyPages/admin-view/admin-view.component';
import {InstructorViewComponent} from 'D:/educational/schedulo/scheduloApp/src/app/MyPages/instructor-view/instructor-view.component';
import {TraineeViewComponent} from 'D:/educational/schedulo/scheduloApp/src/app/MyPages/trainee-view/trainee-view.component';
import { AuthGuard } from './auth.guard';
import { EventsComponent } from './MyPages/instructor-view/events/events.component';
import { SubBatchComponent } from './MyPages/sub-batch/sub-batch.component';
import { SectionComponent } from './MyPages/section/section.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
   {path:'login',component:LoginComponent},
   {path:'admin-view',component:AdminViewComponent,canActivate:[AuthGuard]},
   {path:'instructor-view/:batch_id/:sub_batch_id/:section_id/:section_name',component:InstructorViewComponent,canActivate:[AuthGuard]},
   {path:'trainee-view',component:TraineeViewComponent,canActivate:[AuthGuard]},
   {path:'events/:schedule_id/:schedule_name',component:EventsComponent,canActivate:[AuthGuard]},
   {path:'admin-view/:batch_id/:batch_name',component:SubBatchComponent},
   {path:'section/:batch_id/:sub_batch_id/:batch_name/:sub_batch_name',component:SectionComponent,canActivate:[AuthGuard]}
   
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
