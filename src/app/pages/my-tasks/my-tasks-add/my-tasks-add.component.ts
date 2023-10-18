import { Component,Input } from '@angular/core';
import { ApiService} from '../../../core/services/api.service';
import { HttpClient} from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormArray
} from '@angular/forms';


@Component({
  selector: 'app-my-tasks-add',
  templateUrl: './my-tasks-add.component.html',
  styleUrls: ['./my-tasks-add.component.scss']
})
export class MyTasksAddComponent {
  parentForm: FormGroup;  
  submitted = false; // button

     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.parentForm = this.fb.group({   
      testForm: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  testForm() : FormArray {  
    return this.parentForm.get("testForm") as FormArray  
  }  
     
  newtestForm(): FormGroup {  
    return this.fb.group({  
      name:'' 
    })  
  }  
     
  add() {  
    this.testForm().push(this.newtestForm());  
  }  
     
  remove(i:number) {  
    this.testForm().removeAt(i);  
  } 

}
