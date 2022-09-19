import { Component, OnInit } from '@angular/core';
import { AuthService } from 'D:/educational/schedulo/scheduloApp/src/app/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public _authService:AuthService) { }

  ngOnInit(): void {
  }

}
