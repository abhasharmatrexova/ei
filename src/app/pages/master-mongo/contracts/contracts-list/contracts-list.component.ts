import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit{
  tbodyDataComputed: any;
  statusCounts: { id:number , status_name: string; count: number; }[] = [];
  breadCrumbItems!: Array<{}>;
  
  constructor(private apiService: ApiService,private toastrService:ToastrService){}

    // array of header objects

    theadData = [
      //  {
      //   text: 'Id',
      //   value: 'id',
      //  },
       {
         text: 'Country',
         value: 'supplier.country.name',
       },
       {
        text: 'City',
        value: 'supplier.city.name',
      },
      {
        text: 'Supplier Name',
        value: 'supplier.name',
      },
      {
        text: 'From Date',
        value: 'applicable_dates.from',
      },
      {
        text: 'To Date',
        value: 'applicable_dates.to',
      },
      {
        text: 'Status',
        value: 'status.name',
      },
      {
        text: 'Requested Date',
        value: 'created_at',
        type:'date'
      },
      {
        text: 'Requested By',
        value: 'created_by.name',
      },
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
            'url':'contracts/update/'
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
    addBtnUrl:string = "/contracts/add";
 


   

  ngOnInit(){
      this.breadCrumbItems = [{ label: 'Contracts' }, { label: 'list', active: true }];
      this.apiService.get('contracts').subscribe((statusdata) => {
            this.tbodyDataComputed = statusdata;
      });
    

      // this.apiService.getStatus().subscribe((statusdata) => {
      //      statusdata.forEach((status: any) => {
      //         this.apiService.UserData().subscribe((data) => {
      //               const count = data.filter((user: { status_name: any; }) => user.status_name === status.name).length;
      //               this.statusCounts.push({id: status.id, status_name: status.name, count });
      //           });
      //       });
      // });
       

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
       
        this.apiService.get('contract_delete/'+row.items._id).subscribe(
          (data) => {
            this.tbodyDataComputed = this.tbodyDataComputed.filter(function(item:any){
              return item._id != row.items._id;
            })
            Swal.fire({ title: 'Deleted!', text: 'Your record has been deleted.', confirmButtonColor: 'rgb(3, 142, 220)', icon: 'success', });
          },
          (err) => {
            
              this.toastrService.error('Something went wrong', 'Error', {
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
}
