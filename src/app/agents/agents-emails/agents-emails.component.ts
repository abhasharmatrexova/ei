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
  selector: 'app-agents-emails',
  templateUrl: './agents-emails.component.html',
  styles: [`
       .inputFields {
      margin-top: 15px;
    }
  `]
})
export class AgentsEmailsComponent {
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

  }

}
