import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  title = '';

  constructor() { 
  }

  ngOnInit() {
    this.title = 'Troféu Avai';
  }

}
