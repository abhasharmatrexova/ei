import { Component } from '@angular/core';

@Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.scss']
})
export class AddMoreComponent {
  formDataArray: any[] = [
    {
      name: '',
      email: '',
      country: ''
    }
  ];

  addRow() {
    this.formDataArray.push({
      name: '',
      email: '',
      country: ''
    });
  }

  removeRow(index: number) {
    this.formDataArray.splice(index, 1);
  }
}
