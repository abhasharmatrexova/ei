import { Component,Input } from '@angular/core';
import {ApiService} from '../../core/services/api.service'
import { HttpClient} from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-agents-add',
  templateUrl: './agents-add.component.html',
  styleUrls: ['./agents-add.component.scss']
})
export class AgentsAddComponent {
  // bread crum items
  countries:any;
  cities:any;
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedAccount = 'Select Country';
  selectedAccountCity = 'Select City';


  parentForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder)
  {

    //Validations
    this.parentForm = this.formBuilder.group({
      // Define form controls and their initial values and validators here
     });
  }

  onSubmit() {
    this.submitted = true;
    if (this.parentForm.valid) {
      // Handle form submission here
      console.log('Form data:', this.parentForm.value);
    } else {
      // Mark all form controls as touched to display validation errors
      this.markFormGroupTouched(this.parentForm);
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {

    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  onValueChanged() {
    console.log("test");
  }
  ngOnInit(): void {
    this.getCountry();
    this.breadCrumbItems = [{ label: 'My Agents' }, { label: 'Agents Add', active: true }];
  }
  getCountry() {
    this.apiService.getCountry().subscribe(
      (data) => {
        this.countries = data.data;
        console.log("country",this.countries); // Add a log statement to see if data is received
      },
      (error) => {
        console.error('Error fetching country data:', error);
      }
    );
  }
  getCitiesOfSlectedCountry() {
    this.apiService.getCityListByCountryCode().subscribe(
      (data) => {
        this.cities = data.data;
        console.log("Cities",this.cities); // Add a log statement to see if data is received
      },
      (error) => {
        console.error('Error fetching Cities data of selected country:', error);
      }
    );
  }

}
