import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import { HttpClient} from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  productForm: FormGroup;  
  @Input() phonecode :any;
  @Input() countries :any;
  @Input() cities :any;
     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({
      accounts: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  accounts() : FormArray {  
    return this.productForm.get("accounts") as FormArray  
  }  
     
  newaccounts(): FormGroup {  
    return this.fb.group({  
      wef_date: '',  
      creditor_code: '', 
      company_name:'',
      contact_person:'' ,
      bank_address:'',
      branch_address:'',
      phone:'',
      isd_phone:'',
      email:'',
      VAT_no:'',
      swift:'',
      iban_code:'',
      beneficiary_name:'',
      beneficiary_address:'',
      beneficiary_country:'',
      beneficiary_city:'',
      beneficiary_postal_code:'',
      lastest:''
    })  
  }  
     
  add() {  
    this.accounts().push(this.newaccounts());  
  }  
     
  remove(i:number) {  
    this.accounts().removeAt(i);  
  } 
}

