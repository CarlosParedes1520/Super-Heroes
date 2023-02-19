import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // auth!: Auth

  // get auth(){
  //   return this.authService.auth
  // }
  constructor(private router: Router) {

  }


  // logout(){
  //   this.router.navigate(['./auth'])
  // }
}
