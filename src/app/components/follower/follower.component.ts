import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent implements OnInit {

  @Input() follower;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToUser(username) {
    this.router.navigate(['user', username]);
  }

}
