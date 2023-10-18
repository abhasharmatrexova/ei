import { Component,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api.service';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-agents-phone',
  templateUrl: './agents-phone.component.html',
  styles: [`
       .inputFields {
      margin-top: 15px;
    }
  `]
})
export class AgentsPhoneComponent {
  breadCrumbItems!: Array<{}>;
  parentForm: FormGroup;
  submitted = false; // button

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder) {

    this.parentForm = this.formBuilder.group({
    });
  }
  ngOnInit(): void {
    //this.breadCrumbItems = [{ label: 'Agents Phone Numbers' }, { label: 'Agents Phone Numbers', active: true }];
  }
}
