import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.userService.getTokenLocalStorage()) {
      this.router.navigate(['profile']);
    }
  }

  signIn() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=589bf067b962a0d15ee5&state=iambatman';
  }

}
