import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit {
  tbodyDataComputed: any;
  statusCounts: { id: number, status_name: string; count: number; }[] = [];
  breadCrumbItems!: Array<{}>;

  constructor(private apiService: ApiService,private toastService:ToastrService) {
  }

  // array of header objects

  theadData = [
    {
      text: 'Id',
      value: 'id',
    },
    {
      text: 'Code',
      value: 'code',
    },
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Location',
      value: 'location',
    },
    {
      text: 'Category',
      value: 'category',
    },
    {
      text: 'Created On',
      value: 'created_on',
    },
    {
      text: 'Status',
      value: 'status',
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
          'btnToolTipText':'Update agents data',
          'url':'agents/update/'
        },
        {
          'btnType':'Custom',
          'btnText':'',
          'icons':true,
          'iconClass': 'bx-mobile',
          'btnToolTipText':'Client Phone Number',
          'url':'agents/phone/'
        },
        {
          'btnType':'Custom',
          'btnText':'',
          'icons':true,
          'iconClass': 'bx-mail-send',
          'btnToolTipText':'Client Email ID(s)',
          'url':'agents/email/'
        },
        {
          'btnType':'Custom',
          'btnText':'Staff',
          'icons':true,
          'iconClass': 'bx-user-pin',
          'btnToolTipText':'List of Staff',
          'url':'agents/add-staff/'
        },
        {
          'btnType':'Custom',
          'btnText':'Inquiries',
          'icons':true,
          'iconClass': 'bx-search-alt ',
          'btnToolTipText':'List of Inquiries',
          'url':'agents/add-inquiries/'
        },
        {
          'btnType':'Custom',
          'btnText':'Quotations',
          'icons':true,
          'iconClass': 'bxs-comment-detail',
          'btnToolTipText':'List of Quotations',
          'url':'agents/add-quotations/'
        },
        {
          'btnType':'Custom',
          'btnText':'Tours',
          'icons':true,
          'iconClass': 'bxs-plane-take-off',
          'btnToolTipText':'Add Tours',
          'url':'agents/add-tours/'
        },
        {
          'btnType':'Custom',
          'btnText':'Payments',
          'icons':true,
          'iconClass': 'bxl-paypal',
          'btnToolTipText':'List of Payments',
          'url':'agents/add-payments/'
        },
        {
          'btnType':'Custom',
          'btnText':'Lost Cases',
          'icons':true,
          'iconClass': 'bx-detail',
          'btnToolTipText':'List of Lost Cases',
          'url':'agents/lost-cases/'
        },
        {
          'btnType':'Custom',
          'btnText':'Stats',
          'icons':true,
          'iconClass': 'bx-stats',
          'btnToolTipText':'Client Stats data',
          'url':'agents/stats/'
        },
        {
          'btnType':'Custom',
          'btnText':'Create a task',
          'icons':true,
          'iconClass': 'bx-task',
          'btnToolTipText':'Create New Task',
          'url':'agents/create-task/'
        },
        {
          'btnType':'Custom',
          'btnText':'Allocate staff',
          'icons':true,
          'iconClass': 'bx-user-plus',
          'btnToolTipText':'Allocate Staff to Agent(s)',
          'url':'agents/allocate-staff/'
        },
        {
          'btnType':'Custom',
          'btnText':'Accounts',
          'icons':true,
          'iconClass': 'bx-money',
          'btnToolTipText':'Update Accounts Data',
          'url':'agents/accounts/'
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
  addBtnUrl:string = "agents/add";

  ngOnInit(){
    this.breadCrumbItems = [{ label: 'Agents ' }, { label: 'list', active: true }];
    this.tbodyDataComputed = [
      {
        id: '830475ed8a0236458a56swew324',
        code:'AIND000001',
        name: 'Indian Agents-1',
        location: 'Indore - India',
        category: 'Agent Category',
        created_on: '2023-09-28 17:49:17',
        status: 'Approved'
      },
      {
        id: '830475ed8a0236458a56swew325',
        code:'AIND000002',
        name: 'Indian Agents-2',
        location: 'Delhi - India',
        category: 'Service Type',
        created_on: '2023-09-29 13:49:17',
        status: 'Approved',

      },
      {
        id: '830475ed8a0236458a56swew334',
        code:'AIND000003',
        name: 'Indian Agents-3',
        location: 'Jaipur - India',
        category: 'Ferry Classes',
        created_on: '2023-09-30 22:49:17',
        status: 'Approved'
      },
      {
        id: '830475ed8a0236458a56swew334',
        code:'AIND000004',
        name: 'Indian Agents-4',
        location: 'Kanpur - India',
        category: 'Travels',
        created_on: '2023-09-28 17:49:17',
        status: 'Approved'
      },
      {
        id: '830475ed8a0236458a56swth457',
        code:'AIND000005',
        name: 'Indian Agents-5',
        location: 'Gurgaon - India',
        category: 'Service Type',
        created_on: '2023-09-30 23:30:17',
        status: 'Approved',

      },
      {
        id: '830475ed8a0236458a56swoi120',
        code:'AIND000006',
        name: 'Indian Agents-6',
        location: 'Guahati - India',
        category: 'Tour & Travels',
        created_on: '2023-09-30 23:49:17',
        status: 'Approved'
      }

    ];

    /*this.apiService.get('room_types').subscribe((statusdata) => {
        this.tbodyDataComputed = statusdata;
    });*/

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

