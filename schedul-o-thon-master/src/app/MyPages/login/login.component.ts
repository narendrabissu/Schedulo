import { Component, OnInit } from '@angular/core';
import { AuthService } from 'D:/educational/schedulo/scheduloApp/src/app/auth.service';
import {Router} from '@angular/router'
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs' ;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData = <any>{};
  msg="";
  constructor(private _auth: AuthService,
    private _router:Router ) {}
 
  ngOnInit(): void {}
  loginUser() {
    //console.log(this.loginUserData);
    //this.private_auth.loginUser(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      {next:(res: any) => {
        localStorage.setItem('token',res.token)
        if(res.role=='A') this._router.navigate(['/admin-view']);
        else if(res.role=="I") this._router.navigate(['/instructor-view']);
        else if(res.role=="T") this._router.navigate(['/trainee-view']);
      },

      error:(err)=>this.msg=err.msg
    }
      );
  }
}
