import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  public code;
  public tokenUrl = 'https://github.com/login/oauth/access_token';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      data => {
        this.code = data['code'];
        this.loginService.getToken(this.code).subscribe(
          data => {
            if(data['success']) {
              var token = data['data']['access_token'];
              this.userService.saveTokenLocalStorage(token);
              this.router.navigate(['profile']);
            }
          }
        )
      }
    )
  }

}
