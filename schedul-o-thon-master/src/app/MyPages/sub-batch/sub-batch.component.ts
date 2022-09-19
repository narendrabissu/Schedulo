import { Component,ViewChild, OnInit } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { NgForm, FormGroup ,FormControl } from '@angular/forms';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { SubBatchService } from './sub-batch.service';
import {Details} from './sub_batch_details.model';
import {Batch_Name} from './sub_batch_details.model';
 
@Component({
  selector: 'app-sub-batch',
  templateUrl: './sub-batch.component.html',
  styleUrls: ['./sub-batch.component.css']
})


export class SubBatchComponent implements OnInit {
  subBatchDetails = <any>{};
  sub_batch_details = <any>{};
  sub_batch_id:any;
  data:any

  sub_batchInfo:any;
  batch:any;

  batch_name:any ;


  @ViewChild('editform')
  sub_batch_form!: NgForm;

  @ViewChild('sub_batchForm')
  add_form!: NgForm;
  


  public batch_id: any;
  sub_batch_name: any;

  constructor(public route:ActivatedRoute,private _router: Router,public _auth:SubBatchService) { }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.batch_name = params['batch_name']
      
  });

  console.log(this.batch_name)

    const  batch_id = this.route.snapshot.paramMap.get('batch_id');
    
  
    this.batch_id = batch_id;
    console.log(this.batch_id)
    this.get_SubBatches();
  }


  add_SubBatch(form:NgForm) {

   
    
    this.subBatchDetails.batch_id = this.batch_id
    console.log(this.subBatchDetails)
  
    this._auth.add_SubBatch(this.subBatchDetails)
      .subscribe(
        {
          next: (res: any) => {
            console.log(res);
            alert(" Sub-Batch added successfully");
            form.resetForm();
            let ref = document.getElementById('cancel');
            this.get_SubBatches();
          
          },
          error: (err: any) => {alert("Something went wrong ")}
        }
      );
  
  }

  get_SubBatches() {

    this._auth.get_SubBatches(this.batch_id).subscribe(
      {
        next: (res: any) => { this.sub_batchInfo = res },
        error: (err: any) => console.log(err)
      }
    );


  }

  ViewSection(row:any) {
    
    this._router.navigate(['/section',this.batch_id,row.sub_batch_id,this.batch_name,row.sub_batch_name ]); 
  }




  edit_SubBatch(){
    this.sub_batch_details.batch_name = this.batch_name
    this.sub_batch_details.batch_id = this.batch_id
    this._auth.edit_SubBatch(this.sub_batch_id,this.sub_batch_details).subscribe({
      next:(res:any) => {alert("sub batch updated successfully")},
      error:(err:any) => console.log(err)

    });


  }









  delete_subBatch(sub_batch:any) {
    console.log(sub_batch.sub_batch_id)
    this._auth.delete_subBatch(sub_batch.sub_batch_id).subscribe({

      next:(res:any) =>{alert("sub_batch deleted")
      this.get_SubBatches();},
      error:(err:any)=>console.log(err)


    });


  }






  onADD(){
    this.add_form.form.patchValue({
      batch_name : this.batch_name
    })
  }

  onEdit(row:any){
    this.sub_batch_name = row.sub_batch_name;
   
    this.sub_batch_id = row.sub_batch_id;

this.sub_batch_form.form.patchValue({
  sub_batch_name: row.sub_batch_name,
  batch_name :row.batch_name,
  start_date :row.start_date,
  end_date : row.end_date,
feedback : row.feedback,
batch_admin : row.batch_admin,
dl_name : row.dl_name,
stream:row.stream,
location:row.location,
size : row.size





  })


}


}