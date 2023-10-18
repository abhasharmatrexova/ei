

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent {

  @Input() ratings :any;
  productForm: FormGroup;  

     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({   
      feedbacks: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }
    
  feedbacks() : FormArray {  
    return this.productForm.get("feedbacks") as FormArray  
  }  
     
  newfeedbacks(): FormGroup {  
    return this.fb.group({  
      date: '',  
      comment:'',
      rating:'' 
    })  
  }  
     
  add() {  
    this.feedbacks().push(this.newfeedbacks());  
  }  
     
  remove(i:number) {  
    this.feedbacks().removeAt(i);  
  } 

}
