import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.scss']
})
export class GistComponent implements OnInit {

  @Input() gist;

  constructor() { }

  ngOnInit() {
  }

}
