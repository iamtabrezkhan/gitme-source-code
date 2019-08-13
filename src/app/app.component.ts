import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {

  title = 'git-me';
  public accessToken;
  public user;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  ngAfterContentChecked() {
    this.accessToken = this.userService.getTokenLocalStorage();
    this.user = this.userService.getUserLocalStorage();
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.userService.logout();
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

}
