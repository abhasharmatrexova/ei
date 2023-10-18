import { Component, ViewChild ,Input, EventEmitter, Output} from '@angular/core';
import { DataService } from './data.service'; 
import { PopupModalComponent } from '../popup-modal/popup-modal.component';



@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  @Output() actionBtnEvent = new EventEmitter<object>();
  @Output() mapViewBtnEvent = new EventEmitter<object>();
  @Output() streetViewBtnEvent = new EventEmitter<object>();
  @Output() mapPopupOpen = new EventEmitter<object>();
  
  //****/
  @Input() type: any;
  @Input() tbodyData: any[] = [];
  @Input() theadData: any[] = [];
  @Input() statusCounts: any[] = [];

  
  @Input() p: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() searchValue: string = '';
  @Input() sortKey: string = '';
  @Input() reverse: boolean = false;
  @Input() selectAll: boolean = false;
  @Input() addBtnUrl: string = "";

  @ViewChild(PopupModalComponent)
  popupModalComponent!: PopupModalComponent;

  selectedIds!: string;
  selectedRadioId: number | null = null;

  // Array to track selected status IDs
  selectedStatusIds: number[] = [];
  filteredData: any[] = [];

  //Date Filter
  createdDate!: Date;
  updatedDate!: Date;
  startDate!: Date;
  endDate!: Date;

  //****/

  constructor() { }

  ngOnInit(): void {   
   
  }
  
  ngOnChanges(){
    setTimeout(() => {
      this.filteredData = this.tbodyData;
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 3000)
    
    // this.filteredData = this.tbodyData;
  }

  onDateRangeChange(dateRange: { startDate: Date; endDate: Date }) {
      const startDate = new Date(dateRange.startDate).toISOString().split('T')[0];
      const endDate = new Date(dateRange.endDate).toISOString().split('T')[0];

      // Filter data based on the selected date range.
      this.filteredData = this.tbodyData.filter(item => {
        const createdDate = new Date(item.created_at).toISOString().split('T')[0];
        const updatedDate = new Date(item.updated_at).toISOString().split('T')[0];
        
        console.log(createdDate,updatedDate,startDate,endDate);
        return (
          createdDate >= startDate &&
          createdDate <= endDate &&
          updatedDate >= startDate &&
          updatedDate <= endDate
        );
      });
  }

  
    // Filter the data based on selected status IDs
    filterResults(statusId: number) {
      if (this.selectedStatusIds.includes(statusId)) {
        // If the status ID is already selected, remove it
        this.selectedStatusIds = this.selectedStatusIds.filter(id => id !== statusId);
      } else {
        // If the status ID is not selected, add it
        this.selectedStatusIds.push(statusId);
      }
  
      // Update the filteredData based on selected status IDs
      if (this.selectedStatusIds.length === 0) {
        // If no checkboxes are selected, show all data
          this.filteredData = this.tbodyData;
      } else {
        // If checkboxes are selected, filter the data
        this.filteredData = this.tbodyData.filter(item => this.selectedStatusIds.includes(item.status_id));
      }
    }


  // Toggle the "Check All" checkbox
  selectAllCheckbox(checked: boolean) {
    this.selectAll = checked;
    this.tbodyData.forEach((item) => (item.selected = checked));
    const selectedItems = this.tbodyData.filter((item) => item.selected);
    const selectedIds = selectedItems.map((item) => item.id);
  }

   // Radio Button Single record select
  onRadioChange(id: number) {
    this.selectedRadioId = id;
  }
  
  // Checkbox Selective checkbox select
  onItemChange() {
    const selectedItems = this.tbodyData.filter((item) => item.selected);
    const selectedIds = selectedItems.map((selectedItem) => selectedItem.id);
    this.selectedIds = selectedIds.join(', ');

  }
 
  // Sorting function
  sort(key: string) {
    console.log(key,'sort ',!this.reverse)
    this.sortKey = key;
    this.reverse = !this.reverse;
  }
  headerMain(key:string){
    return ["actions"].includes(key);
  }
  
  /**
  * Confirmation mail model
  */
  deleteId: any;
  confirm(id: any) {
    this.deleteId = id;
    this.popupModalComponent.deleteModal?.show();
  }


  /**
  * Multiple Delete
  */
  checkedValGet: any[] = [];
  // Delete Data
  deleteData(id: any) {

    // if (id) {
    //   document.getElementById('a_' + id)?.remove();

    // }
    // this.checkedValGet.forEach((item: any) => {
    //   document.getElementById('a_' + item)?.remove();
    //   this.masterSelected = false;
    // });

    // this.deleteModal?.hide();
  }

  /**
  * Open modal
  * @param content modal content
  */
  editModal(id: any) {
    
    this.popupModalComponent.showModal?.show()
    // var listData = this.ListJsDatas[id];
    // this.listJsForm.controls['customer_name'].setValue(listData.customer_name);
    // this.listJsForm.controls['email'].setValue(listData.email);
    // this.listJsForm.controls['phone'].setValue(listData.phone);
    // this.listJsForm.controls['date'].setValue(listData.date);
    // this.listJsForm.controls['status'].setValue(listData.status);
    // this.listJsForm.controls['ids'].setValue(listData.id);
  }

  
  mapOpen(items:[]){
    console.log(items,'av');
    this.mapPopupOpen.emit({items:items});
  }
  actionBtn(actType:string,items:[]){
    this.actionBtnEvent.emit({actType:actType, items:items});
  }

  mapViewBtn(actType:string,items:[]){
    this.mapViewBtnEvent.emit({actType:actType, items:items});
  }

  streetViewBtn(actType:string,items:[]){
    this.streetViewBtnEvent.emit({actType:actType, items:items});
  }
  // getValue(item:[],value:any){
    
  //   let dynamicPropertyName:any = value.split('.');
  //   if (dynamicPropertyName.length === 1) {
  //     return item[dynamicPropertyName[0]];
  //   } else if (dynamicPropertyName.length > 1) {
  //     let nestedProperty = item;
  //     for (let i = 0; i < dynamicPropertyName.length; i++) {
  //       nestedProperty = nestedProperty[dynamicPropertyName[i]];
  //     }
  //     return nestedProperty;
  //   }
  //   return '';
    
  // }

  getValue(item: any, value: string) {

    if(value.includes('+')){
      const dynamicValue: string[] = value.split('+');
      let nestedProperty: string = '';
      for (let i = 0; i < dynamicValue.length; i++) {
        if (i > 0) {
          nestedProperty += ' ';
        }
        nestedProperty += dynamicValue[i];
      }
      console.log('nestedProperty', nestedProperty);
      return nestedProperty;
    }else if (value.includes('status.name')) {
      const statusArray = item.status;
      if (Array.isArray(statusArray)) {
        const statusWithFlag1 = statusArray.filter(status => status.current_flag === "1");
        if (statusWithFlag1.length > 0) {
          return statusWithFlag1[0].name; 
        }
      }
    } else {
      const dynamicPropertyName: string[] = value.split('.');
      let nestedProperty: any = item;
      for (let i = 0; i < dynamicPropertyName.length; i++) {
        nestedProperty = nestedProperty[dynamicPropertyName[i]];
        if (nestedProperty === undefined) {
          break;
        }
      }
      return nestedProperty !== undefined ? nestedProperty : '';
    }
    return '';
 }




}
