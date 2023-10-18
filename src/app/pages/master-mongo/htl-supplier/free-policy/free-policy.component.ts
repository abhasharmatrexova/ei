

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';


@Component({
  selector: 'app-free-policy',
  templateUrl: './free-policy.component.html',
  styleUrls: ['./free-policy.component.scss']
})
export class FreePolicyComponent {
  productForm: FormGroup;  
  @Input() lang :any;
  @Input() day :any;
     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({
      freePolicies: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  freePolicies() : FormArray {  
    return this.productForm.get("freePolicies") as FormArray  
  }  
     
  newfreePolicies(): FormGroup {  
    return this.fb.group({  
      wef_date: '',  
      applicable_days: '', 
      close_days_description:'',
      language:'' 
    })  
  }  
     
  add() {  
    this.freePolicies().push(this.newfreePolicies());  
  }  
     
  remove(i:number) {  
    this.freePolicies().removeAt(i);  
  } 
}

