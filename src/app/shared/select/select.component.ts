import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { selectData } from '../data';
import { ApiService} from '../../core/services/api.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Output() formValueChanged = new EventEmitter<void>();

  @Input() items:any;   //Select Data
  @Input() selectedOption: any; // This will receive the selected user ID from the parent

  //#### Form
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() submit:any;
  //#### Form

  @Input() placeholder : any;
  @Input() isCodeRequired:boolean = false;
  @Input() multiple:boolean = false;
  @Input() groupType:boolean = false;
  @Input() groupBy:string = 'id';


  constructor() {}
   
    ngOnInit() { }

    onValueChanged() {
      console.log("test selected");
      this.formValueChanged.emit();
    }
    customSearchFn(term: string, item: any) {
        //console.log("ss",item);
      // return item.country.toLowerCase().indexOf(term.toLowerCase()) > -1;

      const nameMatch = item.name.toLowerCase().includes(term.toLowerCase());
      const countryMatch = item.country.toLowerCase().includes(term.toLowerCase());
      return nameMatch || countryMatch;

    }

}
