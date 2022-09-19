import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl="http://localhost:3000/api/login";
  private _schedulesurl="http://localhost:3000/api/getSchedules/";
  private _addschedule="http://localhost:3000/api/add_schedule";
  private _removeSchedule="http://localhost:3000/api/delete_schedule/";
  private _updateSchedule="http://localhost:3000/api/update_schedule/";
  private _getEvents="http://localhost:3000/api/getEvents/";
  private _addEvents="http://localhost:3000/api/addEvents/";
  private _removeEvent="http://localhost:3000/api/removeEvent/";
  private _updateEvent="http://localhost:3000/api/update_event/";
  constructor(private http:HttpClient, private _router:Router) { }

  get_Events(schedule_id:any){
    return this.http.get(this._getEvents+schedule_id);
  }

  addEvents(data:any){
    return this.http.post(this._addEvents,data);
  }
  removeEvent(event_id:any){
    return this.http.delete(this._removeEvent+event_id);
  }
  updateEvent(event_id:any,data:any){
    return this.http.put(this._updateEvent+event_id,data);
  }
  updateSchedules(schedule_id:any,data:any){
    return this.http.put(this._updateSchedule+schedule_id,data)
  }
  
  addSchedules(data:any){
    return this.http.post(this._addschedule,data)
  }
  removeSchedule(schedule_id:any){
     return this.http.delete(this._removeSchedule+schedule_id,schedule_id)
  }
  getSchedules(batch_id:any,sub_batch_id:any,section_id:any){
    return this.http.get(this._schedulesurl+batch_id+'/'+sub_batch_id+'/'+section_id);
  }
  loginUser(user:any){
    return this.http.post<any>(this._loginUrl,user);

  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login']);
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
