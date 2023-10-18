import { Component,Input,OnInit } from '@angular/core';
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
  selector: 'app-agents-filter',
  templateUrl: './agents-filter.component.html',
  styles: [
  ]
})
export class AgentsFilterComponent {
  // bread crum items
  staffList:any;
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedAccount = 'Select Staff';


  parentForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder)
  {

    //Validations
    this.parentForm = this.formBuilder.group({
      // Define form controls and their initial values and validators here
      countryCode: ['', Validators.required],
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
    this.getStaffList();
    this.breadCrumbItems = [{ label: 'My Agents' }, { label: 'Agents Add', active: true }];
  }

  getStaffList() {
    this.apiService.getCountry().subscribe(
      (data) => {
        this.staffList = data.data;
        console.log("all allocated staff list",this.staffList); // Add a log statement to see if data is received
      },
      (error) => {
        console.error('Error fetching all allocated staff data:', error);
      }
    );
  }

}

