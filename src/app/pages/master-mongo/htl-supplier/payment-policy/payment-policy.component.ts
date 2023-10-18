

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-payment-policy',
  templateUrl: './payment-policy.component.html',
  styleUrls: ['./payment-policy.component.scss']
})
export class PaymentPolicyComponent {
  productForm: FormGroup;  
  @Input() lang :any;
     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({   
      PaymentPolicy: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  PaymentPolicy() : FormArray {  
    return this.productForm.get("PaymentPolicy") as FormArray  
  }  
     
  newPaymentPolicy(): FormGroup {  
    return this.fb.group({  
      wef_date: '', 
      description:'',
      language:'' 
    })  
  }  
     
  add() {  
    this.PaymentPolicy().push(this.newPaymentPolicy());  
  }  
     
  remove(i:number) {  
    this.PaymentPolicy().removeAt(i);  
  } 
}

