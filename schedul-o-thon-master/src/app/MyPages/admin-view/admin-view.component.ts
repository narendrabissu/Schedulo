import { state } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { SubBatchComponent } from '../sub-batch/sub-batch.component';
import { AdminViewService } from './admin-view.service';
import {Batch_Details} from './admin-view.model'


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  batchDetails = <any>{};
  batchInfo:any= [];
  batch_id:any;
  
batch_Details = <any>{};


  @ViewChild('edit_batchForm')
  edit_batch!: NgForm;
   
 constructor(public _auth: AdminViewService, private _router: Router, private _route:ActivatedRoute) { }


  ngOnInit(): void {
    
    this.getBatches();



  }

  addBatch(form:NgForm) {
    console.log(this.batchDetails);
    this._auth.addBatch(this.batchDetails)
      .subscribe(
        {
          next: (res: any) => {
            console.log(res);
            alert("Batch added successfully");
            form.resetForm();
            

        
            this.getBatches();
            
            let ref = document.getElementById('cancel');
          
          },
          error: (err: any) => console.log(err)
        }
      );
  }

  getBatches() {

    this._auth.getBatches().subscribe(
      {
        next: (res: any) => { this.batchInfo = res },
        error: (err: any) => console.log(err)
      }
    )


  }


  delete_Batch(batch:any) {
    if (confirm('Deleting a batch will also delete all the sub batches of this batch . are you sure to delete ?')) {
      this._auth.delete_Batch(batch.batch_id).subscribe({


        next:(res:any) =>{alert("batch deleted")
        this.getBatches();},
        error:(err:any)=>console.log(err)
  
  
      })
      
      
    } else {
      // Do nothing!
      
    }
    


  }


  editBatch(){
    this._auth.editBatch(this.batch_id,this.batch_Details).subscribe({
      next:(res:any) => {alert("batch updated successfully")},
      error:(err:any) => console.log(err)
    })

  }







  onEdit(row:any){

    this.batch_id = row.batch_id;

    this.edit_batch.form.patchValue({
      batchname : row.batchname,
      location : row.location,
      batchsize : row.batchsize,
      startdate : row.startdate,
      batchtype : row.batchtype

    })
    
  }















  ViewbatchDetail(batch: any) { 
    const data = {batch_id : batch.batch_id,batch_name:batch.batchname}
    this._router.navigate(['/admin-view', batch.batch_id,data.batch_name]); 
         }

  

}