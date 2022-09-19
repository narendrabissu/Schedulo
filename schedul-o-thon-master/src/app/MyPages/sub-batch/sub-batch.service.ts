import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubBatchService {
  id:any;
  constructor( private http:HttpClient) {}
  url = "http://localhost:3000/api/add_SubBatch";
  url1 = "http://localhost:3000/api/get_SubBatches";
  url2 = "http://localhost:3000/api/delete_subBatch";
  url3 = "http://localhost:3000/api/edit_SubBatch";

  add_SubBatch(subBatchDetails:any){
    return this.http.post<any>(this.url,subBatchDetails)

  }

  
  get_SubBatches(batch_id:any) {
   
    return this.http.get(this.url1 + "/" + batch_id);
  }

  delete_subBatch(sub_batch_id:any){
    return this.http.get(this.url2 + "/" + sub_batch_id);
  }

  edit_SubBatch(sub_batch_id:any,sub_batch_details:any) {
    return this.http.put(this.url3 + "/" + sub_batch_id,sub_batch_details)
  }

}