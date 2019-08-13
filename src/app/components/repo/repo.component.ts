import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  @Input() repo;

  constructor() { }

  ngOnInit() {
  }

}
