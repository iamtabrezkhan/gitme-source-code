import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Animations } from '../../animations/animations';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    Animations.topToDown
  ]
})
export class SearchComponent implements OnInit {

  public users = [];
  public pageNumber = 1;
  public query;
  public totalCount = 0;
  public isLoading = false;
  public isLoadingMore = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  search() {
    if(!this.query) {
      return;
    }
    this.isLoading = true;
    this.totalCount = 0;
    this.pageNumber = 0;
    this.users = [];
    this.userService.searchUser(this.query, this.pageNumber).subscribe(
      data => {
        this.isLoading = false;
        this.totalCount = data['total_count'];
        this.users = this.users.concat(data['items']);
        this.pageNumber++;
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
  }

  loadMore() {
    this.isLoadingMore = true;
    this.userService.searchUser(this.query, this.pageNumber).subscribe(
      data => {
        this.isLoadingMore = false;
        this.totalCount = data['total_count'];
        this.users = this.users.concat(data['items']);
        this.pageNumber++;
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
  }

}
