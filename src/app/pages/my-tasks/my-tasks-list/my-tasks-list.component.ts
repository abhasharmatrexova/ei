import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
@Component({
  selector: 'app-my-tasks-list',
  templateUrl: './my-tasks-list.component.html',
  styleUrls: ['./my-tasks-list.component.scss']
})
export class MyTasksListComponent implements OnInit {
  tbodyDataComputed: any;
  statusCounts: { id:number , status_name: string; count: number; }[] = [];
  
  constructor(private apiService: ApiService){}

    // array of header objects

    theadData = [
       {
        text: 'Id',
        value: 'id',
       },
       {
         text: 'Name',
         value: 'name',
       },
       {
        text: 'Email',
        value: 'email_id',
      },
      {
        text: 'Phone No',
        value: 'phone_no',
      },
      {
        text: 'Company',
        value: 'company_name',
      },
      {
        text: 'Website',
        value: 'website',
      },
      {
        text: 'Status',
        value: 'status_name',
      },
      {
        text: 'Created Date',
        value: 'created_at',
      },
      {
        text: 'Updated Date',
        value: 'created_at',
      },
      {
        text: 'Actions',
        align: 'start',
        sortable: false,
        value: 'actions',
      },
    ];

    p: number = 1; // Current page
    itemsPerPage: number = 2; // Items per page
    searchValue: string = '';
    sortKey: string = '';
    reverse: boolean = false;
    selectAll: boolean = false;

 


   

  ngOnInit(){
       this.apiService.UserData().subscribe(
        (data) => {
          this.tbodyDataComputed = data;
      });

      this.apiService.getStatus().subscribe((statusdata) => {
           statusdata.forEach((status: any) => {
              this.apiService.UserData().subscribe((data) => {
                    const count = data.filter((user: { status_name: any; }) => user.status_name === status.name).length;
                    this.statusCounts.push({id: status.id, status_name: status.name, count });
                });
            });
      });
       

  }

}
