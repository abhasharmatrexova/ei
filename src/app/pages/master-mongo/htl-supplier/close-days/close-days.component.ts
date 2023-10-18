

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';


@Component({
  selector: 'app-close-days',
  templateUrl: './close-days.component.html',
  styleUrls: ['./close-days.component.scss']
})
export class CloseDaysComponent {
  productForm: FormGroup;  
  @Input() lang :any;
  @Input() day :any;
     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({  
      // name: '',  
      closedates: this.fb.array([]) ,  
    });  
  }  

  @Output() dateRangeChange = new EventEmitter<{ startDate: Date; endDate: Date }>();

  onDateRangeChange(dateRange: any) {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    this.dateRangeChange.emit({ startDate, endDate });
  }

  ngOnInit(): void {
    this.add();    
  }
    
  closedates() : FormArray {  
    return this.productForm.get("closedates") as FormArray  
  }  
     
  newClosedates(): FormGroup {  
    return this.fb.group({  
      close_dates: '',  
      applicable_days: '', 
      close_days_description:'',
      language:'' 
    })  
  }  
     
  add() {  
    this.closedates().push(this.newClosedates());  
  }  
     
  remove(i:number) {  
    this.closedates().removeAt(i);  
  } 
}

