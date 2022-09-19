import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'D:/educational/schedulo/scheduloApp/src/app/auth.service';
import {Router} from '@angular/router'
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl,FormGroup } from '@angular/forms';
import { Schedule } from './schedule.model';

@Component({
  selector: 'app-instructor-view',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.css']
})
export class InstructorViewComponent implements OnInit {
  
  schedule=new Schedule(0,"","","","","");
  @ViewChild('scheduleEditForm')
  scheduleForm!: NgForm;
   instructorname="Henry";
   lstSchedules:any=[];
   scheduleData=<any>{};
   schedule_data=<any>{};
   @ViewChild('scheduleForm')
   add_form!:NgForm;

   section_id=this._route.snapshot.paramMap.get('section_id');
   sub_batch_id=this._route.snapshot.paramMap.get('sub_batch_id');
   batch_id=this._route.snapshot.paramMap.get('batch_id');
   section_name=this._route.snapshot.paramMap.get('section_name');
   
  constructor( private _auth: AuthService, private _router:Router,private _route:ActivatedRoute ) {
    
   }
  ngOnInit(): void {
    this.getSchedule();
}

onADD(){
  
  this.add_form.form.patchValue({
    batch_id: this.batch_id,
    sub_batch_id:this.sub_batch_id,
    section_id:this.section_id
  })
}
  
getSchedule(){
  //console.log("hi");
  this._auth.getSchedules(this.batch_id,this.sub_batch_id,this.section_id)
      .subscribe((
        data)=>{
          this.lstSchedules=data;
        }
      );
      //console.log(this.lstSchedules)
}
  Details(form:NgForm): void{
    console.log(this.scheduleData);
    this._auth.addSchedules(this.scheduleData)
    .subscribe({next:(res:any)=>{ 
      console.log(res);
      alert("schedule Added sucessfully")
      let ref=document.getElementById('cancel');
      ref?.click();
      form.resetForm();
    this.getSchedule();
  },
      error:(err)=>
        alert("something went wrong")
      
    });
    }
    delete(row:any){
      if(confirm("deleting a schedule will delete all the events in that schedule, Are you sure you want to delete?")){
      this._auth.removeSchedule(row.schedule_id).subscribe(
        res=>{ alert("Schedule deleted Successfully")
        this.getSchedule();
        
      })
    }
    }
    getscheduleById(row:any){
      //console.log(row.schedule_id);
      this.schedule.schedule_id=row.schedule_id;
        this.scheduleForm.form.patchValue({
          schedule_name:row.schedule_name,
          description:row.description,
          batch:row.batch,
          sub_batch:row.sub_batch,
          section:row.section
        })
      
    }
    updateSchedules(form:NgForm){
      console.log(this.schedule.schedule_id);
       this._auth.updateSchedules(this.schedule.schedule_id,this.schedule_data).subscribe(
         res=>{alert("Schedule updated succesfully")
         let ref=document.getElementById('cancel');
         ref?.click();
         form.resetForm();
         this.getSchedule();
     }
       )
    }
    viewEventDetail(row: any) { this._router.navigate(['/events', row.schedule_id,row.schedule_name]); 
  }

}
