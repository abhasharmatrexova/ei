import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-boxicon',
  templateUrl: './boxicon.component.html',
  styleUrls: ['./boxicon.component.scss']
})
export class BoxiconComponent {
  breadCrumbItems!: Array<{}>;
  @Input() iconClass: string | undefined;

  get iconClasses() {
    return `bx ${this.iconClass}`;
  }

  ngOnInit() {
  }

}
