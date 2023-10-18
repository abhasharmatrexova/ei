

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.scss']
})
export class CancellationPolicyComponent {
  @Input() lang :any;
  productForm: FormGroup;  

     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({   
      cancellationPolicy: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  cancellationPolicy() : FormArray {  
    return this.productForm.get("cancellationPolicy") as FormArray  
  }  
     
  newCancellationPolicy(): FormGroup {  
    return this.fb.group({  
      wef_date: '',  
      cancellation_description:'',
      language:'' 
    })  
  }  
     
  add() {  
    this.cancellationPolicy().push(this.newCancellationPolicy());  
  }  
     
  remove(i:number) {  
    this.cancellationPolicy().removeAt(i);  
  } 
}
