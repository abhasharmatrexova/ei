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
  selector: 'app-agents-ui-staff',
  templateUrl: './agents-ui-staff.component.html'
})
export class AgentsUiStaffComponent {

  // bread crum items
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;

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
  formDataArray: any[] = [
    {
      name: '',
      department: '',
      designation: '',
      phone:'',
      email:''
    }
  ];

  addRow() {
    this.formDataArray.push({
      name: '',
      department: '',
      designation: '',
      phone:'',
      email:''
    });
  }

  removeRow(index: number) {
    this.formDataArray.splice(index, 1);
  }
}
