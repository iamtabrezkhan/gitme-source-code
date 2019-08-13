import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { Animations } from '../../animations/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    Animations.topToDown
  ]
})
export class UserComponent implements OnInit {

  public user;
  public publicRepos;
  public publicGists;
  public followers;
  public loadingMoreFollowers = false;
  public pageForFollowers = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  onScroll() {
  }

  ngOnInit() {
    if(!this.userService.getTokenLocalStorage()) {
      this.router.navigate(['login']);
    }
    this.route.params.subscribe(
      params => {
        window.scroll(0, 0);
        this.pageForFollowers = 1;
        this.publicGists = null;
        this.publicRepos = null;
        this.followers = null;
        this.loadingMoreFollowers = false;
        this.user = null;
        if(!params['username']) {
          this.userService.fetchUser(this.userService.getTokenLocalStorage()).subscribe(
            data => {
              this.user = data;
              this.userService.saveUserLocalStorage(this.user);
              this.userService.fetchMyPublicRepos().subscribe(
                repos => {
                  this.publicRepos = repos || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              )
              this.userService.fetchUserGists(this.userService.getUserLocalStorage()['login']).subscribe(
                gists => {
                  this.publicGists = gists || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              )
              this.userService.fetchMyFollowers().subscribe(
                followers => {
                  this.followers = followers || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              )
            },
            err => {
              if(err.status === 404) {
                this.toastr.error('User not found, please try again!', 'Error');
                this.router.navigate(['profile']);
              }
              if(err.status === 401) {
                this.toastr.error('Invalid token, please login again!', 'Error');
                this.userService.logout();
              }
            }
          )
        } else {
          this.userService.fetchSingleUser(params['username'], this.userService.getTokenLocalStorage()).subscribe(
            data => {
              this.user = data;
              this.userService.fetchUserPublicRepo(params['username']).subscribe(
                repos => {
                  this.publicRepos = repos || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              );
              this.userService.fetchUserGists(params['username']).subscribe(
                gists => {
                  this.publicGists = gists || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              )
              this.userService.fetchUserFollowers(params['username']).subscribe(
                followers => {
                  this.followers = followers || [];
                },
                err => {
                  if(err.status === 404) {
                    this.toastr.error('Not found, please try again!', 'Error');
                    this.router.navigate(['profile']);
                  }
                  if(err.status === 401) {
                    this.toastr.error('Invalid token, please login again!', 'Error');
                    this.userService.logout();
                  }
                }
              )
            },
            err => {
              if(err.status === 404) {
                this.toastr.error('User not found, please try again!', 'Error');
                this.router.navigate(['profile']);
              }
              if(err.status === 401) {
                this.toastr.error('Invalid token, please login again!', 'Error');
                this.userService.logout();
              }
            }
          )
        }
      }
    )
  }

  loadMoreFollowers() {
    if(this.loadingMoreFollowers) {
      return;
    }
    this.loadingMoreFollowers = true;
    this.pageForFollowers++;
    this.userService.loadMoreFollowers(this.user.login, this.pageForFollowers).subscribe(
      data => {
        this.loadingMoreFollowers = false;
        this.followers = this.followers.concat(data);
      },
      err => {
        if(err.status === 404) {
          this.toastr.error('User not found, please try again!', 'Error');
          this.router.navigate(['profile']);
        }
        if(err.status === 401) {
          this.toastr.error('Invalid token, please login again!', 'Error');
          this.userService.logout();
        }
      }
    )
  }

}
