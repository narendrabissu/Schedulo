import { Component,ViewChild, OnInit } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { NgForm, FormGroup ,FormControl } from '@angular/forms';

import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { Sections } from './section.model';
import { SectionService } from './section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
   count :number = 0;
  
  batch_name: any;
  sub_batch_name: any;
  batch_id: any;
  sub_batch_id: any;
  sectionDetails = <any>{}
section_id:any;
  @ViewChild('sectionForm')
  section!: NgForm;
  

  
  sectionInfo = <any>[];
  

  constructor(public route:ActivatedRoute,private _router: Router,public _auth:SectionService) { }
  

  ngOnInit(): void {
  
    this.count = 100;


    this.route.params.subscribe(params => {
      this.batch_name = params['batch_name']
      this.sub_batch_name = params['sub_batch_name']
      this.batch_id = params['batch_id']
      this.sub_batch_id = params['sub_batch_id']
      

      this.getSections();

      
  });
  }


  getSections(){
   
    this._auth.getSections(this.sub_batch_id,this.batch_id).subscribe(
      {
        next: (res: any) => { this.sectionInfo = res },
        error: (err: any) => console.log(err)
      }
    );
  }


  addSections(form:NgForm) {
    
    this.sectionDetails.batch_id = this.batch_id;

    this.sectionDetails.sub_batch_id = this.sub_batch_id;
    this.sectionDetails.strength = this.count;



    console.log(this.sectionDetails)
  
    this._auth.addSections(this.sectionDetails)
      .subscribe(
        {
          next: (res: any) => {
            console.log(res);
            alert(" Section added successfully");
            form.resetForm();
            let ref = document.getElementById('cancel');
            this.getSections();
          
          },
          error: (err: any) => {alert("Something went wrong ")}
        }
      );
  }

  editSections(){
    
    this.sectionDetails.batch_id = this.batch_id;

    this.sectionDetails.sub_batch_id = this.sub_batch_id;
    this.sectionDetails.strength = this.count;
    this._auth.editSections(this.section_id,this.sectionDetails).subscribe({
      next:(res:any) => {alert("sub batch updated successfully")},
      error:(err:any) => console.log(err)

    });


  }

  deleteSection(row:any) {
    
    this._auth.deleteSection(row.section_id).subscribe({

      next:(res:any) =>{alert("section deleted")
      this.getSections();},
      error:(err:any)=>console.log(err)


    });


  }




  viewSectionDetail(row: any) { this._router.navigate(['/instructor-view',row.batch_id,row.sub_batch_id, row.section_id,row.section_name]); 


  }





  
  
  
  
  
  editInfo(row:any) {

 this.section_id = row.section_id;

    this.section.form.patchValue({
      section_name : row.section_name,
      classroom: row.classroom,
      owner:row.owner,
      track:row.track,
      dl_name:row.dl_name
    })

  }

}