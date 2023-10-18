import { Component,EventEmitter,Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent {
  bsConfig?: Partial<BsDatepickerConfig>;
  colorTheme: any = 'theme-blue';
  @Input() type: number | undefined;

  @Input() placeholder : any;
  @Input() showMeridian : boolean = false;
  //#### Form
  @Input() parentForm!: FormGroup;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() submit:any;
  //#### Form


  // @Output() dateSelected = new EventEmitter<Date>();

  @Output() dateRangeChange = new EventEmitter<{ startDate: Date; endDate: Date }>();

  onDateRangeChange(dateRange: any) {
    // The dateRange parameter contains the selected date range.
    // You can extract start and end dates as needed.
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    
    // Emit the selected date range to the parent component.
    this.dateRangeChange.emit({ startDate, endDate });
  }
  
  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: true });
  }
}
