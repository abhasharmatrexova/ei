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
        text: 'Country',
        value: 'country.name',
      },
      {
        text: 'City',
        value: 'city.name',
      },
      {
        text: 'Phone Code',
        value: 'key_phone.phone_code',
      },

      {
        text: 'Phone',
        value: 'key_phone.phone',
      },
      // {
      //   text: 'Alt Phone',
      //   value: 'alt_phone.phone',
      // },
      {
        text: 'Email',
        value: 'main_email',
      },
      // {
      //   text: 'Alt Email',
      //   value: 'alt_email',
      // },
      {
        text: 'Location',
        value: '',
        type:'location'
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
            'url':'supplier-chains/update/'
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
    addBtnUrl:string = "/supplier-chains/add";


   

  ngOnInit(){
    this.breadCrumbItems = [{ label: 'Supplier Chain' }, { label: 'list', active: true }];

    this.apiService.get('supplier-chain').subscribe((statusdata) => {
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
       
        this.apiService.get('supplier-chain/delete/'+row.items._id).subscribe(
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
    // console.log(row,'parent');
    // this.items.push(newItem);
  }

  mapViewBtn(row:any) {
    console.log(row,'parent');
  }

  streetViewBtn(row:any) {
  }
}
