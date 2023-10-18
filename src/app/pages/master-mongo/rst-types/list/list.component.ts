import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  tbodyDataComputed: any;
  statusCounts: { id:number , status_name: string; count: number; }[] = [];
  breadCrumbItems!: Array<{}>;
  
  constructor(private apiService: ApiService,private toastService:ToastrService){}

    // array of header objects

    theadData = [
       
       {
        text: 'Code',
        value: 'code',
      },
       {
         text: 'Name',
         value: 'name',
       },
       
      {
        text: 'cousine type',
        value: 'cousine_type.name',
      },
      {
        text: 'main course',
        value: 'main_course.name',
      },
      {
        text: 'meal type',
        value: 'meal_type.name',
      },
      {
        text: 'validity start Date',
        value: 'menu_validity.start_date',
       // type:'date'
      },
      {
        text: 'validity End Date',
        value: 'menu_validity.end_date',
        //type:'date'
      },
      
      // {
      //   text: 'Created on',
      //   value: 'created_at',
      //   type:'date'
      // },
      // {
      //   text: 'Updated on',
      //   value: 'created_at',
      //   type:'date'
      // },
      {
        text: 'Actions',
        align: 'start',
        sortable: false,
        value: 'actions',
        data:[
          {
            'btnType':'Edit',
            'btnText':'',
            'icons':true,
            'btnToolTipText':'Update row',
            'url':'rst-services/update/'
          },
          {
            'btnType':'Delete',
            'btnText':'',
            'icons':true,
            'btnToolTipText':'Delete row',
          }
        ]
      },
    ];

    p: number = 1; // Current page
    itemsPerPage: number = 10; // Items per page
    searchValue: string = '';
    sortKey: string = '';
    reverse: boolean = false;
    selectAll: boolean = false;
    addBtnUrl:string = "/rst-services/add";


   

  ngOnInit(){
    this.breadCrumbItems = [{ label: 'RST Services' }, { label: 'list', active: true }];

    this.apiService.get('rst-type').subscribe((statusdata) => {
        this.tbodyDataComputed = statusdata;
    });
  }
  actionBtn(row:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(3, 142, 220)',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
       
        this.apiService.get('rst-type/delete/'+row.items._id).subscribe(
          (data) => {
            this.tbodyDataComputed = this.tbodyDataComputed.filter(function(item:any){
              return item._id != row.items._id;
            })
            Swal.fire({ title: 'Deleted!', text: 'Your record has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
          },
          (err) => {
            
              this.toastService.error('Something went wrong', 'Error', {
                timeOut: 9000,
                enableHtml: true
              });
            
           
          }
        );
        //Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
      }
    });
    console.log(row,'parent');
    // this.items.push(newItem);
  }
}
