import { Component } from '@angular/core';
import { LAYOUT_HORIZONTAL, LAYOUT_TWOCOLUMN, LAYOUT_VERTICAL } from './layouts.model';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {

  // layout related config
  layoutType!: string;
  showMain: any;

  constructor() { }

  ngOnInit() {
    this.layoutType = LAYOUT_VERTICAL;
  }
  
}
