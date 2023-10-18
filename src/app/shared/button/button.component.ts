import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  // bread crum items
  // breadCrumbItems!: Array<{}>;
  @Input() buttonType : string | undefined;
  @Input() disabled : boolean | false | undefined;

  ngOnInit(): void {
    // this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Buttons', active: true }];
  }
  // Follow Unfollow custom Toggle
  togglebtn(event: any) {
    var followbtn = event.target.closest('.custom-toggle') as any;
    if (followbtn.classList.contains("active")) {
      followbtn.classList.remove('active')
    } else {
      followbtn.classList.add('active')
    }
  }
}
