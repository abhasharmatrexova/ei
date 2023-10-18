import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchsComponent {
  //### Form
  @Input() parentForm!: FormGroup;
  @Input() submit:any;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() type!: string; 
  @Input() placeholder:any;
  @Input() id:string='random-switch';
  @Input() label:string='Switch';
  //### Form

  @Output() formValueChanged = new EventEmitter<void>();

  ngOnInit(){
  }

  // Emit the formValueChanged event whenever a form field changes
  onValueChanged() {
    // console.log("test");
    this.formValueChanged.emit();
  }
}
