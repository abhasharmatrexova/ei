import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { countryData } from '../data';
import { ApiService} from '../../core/services/api.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Input() item:any;   //Country Data

  //#### Form
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() submit:any;
  //#### Form

  @Input() selectedAccount : any;
  @Input() isCodeRequired:boolean = false;
  @Input() isFLagRequired:boolean = false;
  @Input() isCNameRequired:boolean = false;
  @Input() isNameRequired:boolean = false;


  constructor() {}
   
    ngOnInit() { }

}
