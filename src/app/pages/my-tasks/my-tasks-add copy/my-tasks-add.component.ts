import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../core/services/api.service';
import { HttpClient} from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from './validation';

@Component({
  selector: 'app-my-tasks-add',
  templateUrl: './my-tasks-add.component.html',
  styleUrls: ['./my-tasks-add.component.scss']
})
export class MyTasksAddComponent implements OnInit {

  //forms

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
   // bread crum items
  countries:any; 
  breadCrumbItems!: Array<{}>;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder){}
    

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    

    this.getCountry();
    this.breadCrumbItems = [{ label: 'My Tasks' }, { label: 'My Task Add', active: true }];
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
  getCountry() {
    this.apiService.getCountry().subscribe(
      (data) => {
        this.countries = data;
        console.log(data); // Add a log statement to see if data is received
      },
      (error) => {
        console.error('Error fetching country data:', error);
      }
    );
  }

}
