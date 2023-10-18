import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  //### Form
  @Input() parentForm!: FormGroup;
  @Input() submit:any;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() type!: string; 
  @Input() placeholder:any;
  @Input() rows:number = 3;
  //### Form

  @Output() formValueChanged = new EventEmitter<void>();

  ngOnInit(){
  }

  // Emit the formValueChanged event whenever a form field changes
  onValueChanged() {
    console.log("test");
    this.formValueChanged.emit();
  }
}
