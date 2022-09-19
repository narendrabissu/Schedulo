import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'D:/educational/schedulo/scheduloApp/src/app/auth.service';
import {ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Event } from './event.model';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  event=new Event(0,"",new Date('22/10/1967'),new Date('7/10/2040'),"","",0);
  @ViewChild('eventEditForm')
  eventEditForm!:NgForm
  
  event_data=<any>[];
  eventForm!: NgForm;
  
  schedule_id=this._route.snapshot.paramMap.get('schedule_id');
  schedule_name=this._route.snapshot.paramMap.get('schedule_name');
  @ViewChild('eventForm')
  add_form!:NgForm;
  eventData=<any>{};
  data=<any>{};
  
  constructor(private _auth: AuthService,private _route:ActivatedRoute) { }
    

  ngOnInit(): void {
    this.get_Events();
   
  
  }
  isPhysical: boolean = true;
  ChangeData(valid: boolean) {
    this.isPhysical = valid;}

  onADD(){
    this.add_form.form.patchValue({
      schedule_id: this.schedule_id
    })
  }

  get_Events() {

    this._auth.get_Events(this.schedule_id).subscribe(
      {
        next: (res: any) => { this.event_data = res },
        error: (err: any) => console.log(err)
      }
    );
  }

  addEvents(form:NgForm): void{
   this.eventData.schedule_id=this.schedule_id;
   this._auth.addEvents(this.eventData)
    .subscribe({next:(res:any)=>{ 
      console.log(res);
      alert("schedule Added sucessfully")
      let ref=document.getElementById('cancel');
      ref?.click();
      form.resetForm();
    this.get_Events();
  },
      error:(err)=>
        alert("something went wrong")
      
    });
    }


    delete(row:any){
      if(confirm(" Are you sure you want to delete this event?")){
      this._auth.removeEvent(row.event_id).subscribe(
        res=>{ alert("event deleted Successfully")
        this.get_Events();
        
      })
    }
    }

    getEventById(row:any){
      //console.log(row.schedule_id);
      this.event.event_id=row.event_id;
        this.eventEditForm.form.patchValue({
          event_title:row.event_title,
          start_date:row.start_date,
          end_date:row.end_date,
          instructor:row.instructor,
          additional_info:row.additional_info,
          schedule_id:row.schedule_id
        })
      
    }
    updateEvents(form:NgForm){
      console.log(this.event.event_id);
       this._auth.updateEvent(this.event.event_id,this.data).subscribe(
         res=>{alert("Event updated succesfully")
         let ref=document.getElementById('cancel');
         ref?.click();
         form.resetForm();
         this.get_Events();
     }
       )
    }









    







  }








