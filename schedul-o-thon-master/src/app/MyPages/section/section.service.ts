import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  

  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/api/getSections";
  url1 = "http://localhost:3000/api/addSections";
  url2 = "http://localhost:3000/api/editSections";
  url3 = "http://localhost:3000/api/deleteSection";

  getSections(sub_batch_id:any,batch_id:any){

    return this.http.get(this.url + "/" + batch_id + "/" + sub_batch_id);
  }

  addSections(sectionDetails : any){

    return this.http.post(this.url1,sectionDetails);

  }

  editSections(section_id:any,sectionDetails:any){
    return this.http.put(this.url2 + "/" + section_id,sectionDetails)
  }

  deleteSection(section_id:any) {
    return this.http.get(this.url3 + "/" + section_id);
  }

  


}