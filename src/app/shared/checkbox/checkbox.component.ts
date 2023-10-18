import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxsComponent {
  //### Form
  @Input() parentForm!: FormGroup;
  @Input() submit:any;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() type!: string; 
  @Input() placeholder:any;
  @Input() id:string='random-checkbox';
  @Input() label:string='Checkbox';
  @Input() listItems:any=[];
  @Input() selectedValue:any=[];
  //### Form
  items:any=[];
  @Output() formValueChanged = new EventEmitter<void>();

  ngOnInit(){    
    this.items = this.listItems.map(function(item:any){
      item.selected = false;
      return item;
    });
  }
 async ngOnChanges() {
    
      let vl:any = await this.parentForm.controls[this.controlName].value;
      this.items = this.listItems.map(function(item:any){
        item.selected = vl.includes(item.id)  || vl.includes(item.id+"") ?true:false;
        return item;
      });
      // console.log(vl,this.selectedValue,'data vl',this.parentForm.controls[this.controlName].value);
    
    
  }
  // Emit the formValueChanged event whenever a form field changes
  onValueChanged() {
    console.log("test value chane");
    // this.formValueChanged.emit();
  }
  itemClicked(itemSelected:any){
    let selectedItems:any = [];
    this.items = this.items.map(function(item:any){
      item.selected = itemSelected.id==item.id?!item.selected:item.selected;
      if(item.selected){
        selectedItems.push(item.id);
      }
      return item;
    });
    // this.parentForm[this.controlName].value = selectedItems;
    this.parentForm.controls[this.controlName].setValue(selectedItems);
  }
}
