import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/helpers/helpers';
import { StatusCodeService, StatusCodes } from '../../../../core/services/status-code.service';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormArray
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contracts-add',
  templateUrl: './contracts-add.component.html',
  styleUrls: ['./contracts-add.component.scss']
})
export class ContractsAddComponent {
  parentForm: FormGroup;
  submitted = false; // button

  breadCrumbItems!: Array<{}>;

  isFirstOpen = true //accordian

  company: any;
  office: any;
  contracts: any;
  tour: any;
  agent: any;
  pContract: any;
  staff: any;
  status: any;
  suppliers: any;
  tTypes: any;
  userId: any;

  _id:'' | undefined;
  executed: any;
  dept_contracting: any;
  // mediaFiles: any;
  images: any[] = []; 
  oldfiles: any;
  oldstatus: any;
  slectedStatus: any;

  attachmentsForm: FormGroup | undefined;
  applicableTourtypeForm: FormGroup | undefined;
  applicableAgentForm: FormGroup | undefined;
  pContractForm: FormGroup | undefined;
  applicableTourForm: FormGroup | undefined;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    private _router:Router,
    public toastrService: ToastrService,
    private _activatedroute : ActivatedRoute,
    private statusCodeService:StatusCodeService
    )
    {

      this.attachmentsForm = this.formBuilder.group({
        title: new FormControl('', []),
        file: new FormControl('', []),
      });

      this.applicableTourtypeForm = this.formBuilder.group({
        name: new FormControl('', []),
      });

      this.applicableAgentForm = this.formBuilder.group({
        name: new FormControl('', []),
      });
      this.applicableTourForm = this.formBuilder.group({
        name: new FormControl('', []),
      });
      this.pContractForm = this.formBuilder.group({
        name: new FormControl('', []),
      });

      //Validations
      this.parentForm = this.formBuilder.group({
          attachments: this.formBuilder.array([]),
          applicable_tourtype:this.formBuilder.array([]),
          applicable_agent:this.formBuilder.array([]),
          pre_contract: this.formBuilder.array([]),
          applicable_tour: this.formBuilder.array([]),

          contract_no: ['', ''],
          sname: ['', ''],
          sdepartment: ['', ''],
          sdegination: ['', ''],
          sphone: ['', ''],
          semail: ['', ''],
          company: ['', ''],
          office: ['', ''],
          requested: ['', ''],
          supplier: ['', ''],
          applicable_dates: ['', ''],
          status: ['', ''],
          signed: ['', ''],
          executed: ['', ''],
          approval: ['', ''],
          // title: ['', ''],
          // file: ['', '']
        });
    }


  
    ngOnInit(): void {
      this.init();
      this._id = this._activatedroute.snapshot.params['id'];
      if(this._id){
          this.breadCrumbItems = [{ label: 'Contracts' }, { label: 'Update', active: true }];
          this.getById(this._id);
      } else {
          this.slectedStatus = StatusCodes.S_CONTRACTS_OPEN;
          this.breadCrumbItems = [{ label: 'Contracts' }, { label: 'Add', active: true }];

          this.addNewItem();
          this.add('tour_type');
          this.add('agent');
          this.add('tour');
          this.add('pre_contract');
      }

      this.userId = 3;//localStorage.getItem('userId')
    }
 
    get applicable_tourtype() {
      return this.parentForm.controls["applicable_tourtype"] as FormArray;
    }
    get applicable_agent() {
      return this.parentForm.controls["applicable_agent"] as FormArray;
    }
    get applicable_tour(){
      return this.parentForm.controls["applicable_tour"] as FormArray;
    }
    get pre_contract(){
      return this.parentForm.controls["pre_contract"] as FormArray;
    }

    

   addOrUpdateControl(controlName: string, type: string, value: string = '') {
    const control = this.parentForm.get(controlName) as FormArray;
    if (control) {
      const newItem = new FormGroup({
        'item': new FormControl(value, [])
      });
      control.push(newItem);
    }
  }  

  add(type:any,vl:string=''){
    if (type === 'tour_type') {
      this.addOrUpdateControl("applicable_tourtype", "tour_type", vl);
    } else if (type === 'agent') {
      this.addOrUpdateControl("applicable_agent", "agent", vl);
    } else if (type === 'tour') {
      this.addOrUpdateControl("applicable_tour", "tour", vl);
    } else if (type === 'pre_contract') {
      this.addOrUpdateControl("pre_contract", "pre_contract", vl);
    }
 }

   //Remove row
   resetOrRemoveControl(type: string, controlName: string, index: number) {
    const control = this.parentForm.get(controlName) as FormArray;
  
    if (control) {
      if (control.length > 1) {
        control.removeAt(index);
      } else {
        control.reset();
      }
    }
  }

    remove(type:any,i:number){
      if (type === 'tour_type') {
        this.resetOrRemoveControl('tour_type', 'applicable_tourtype', i);
      } else if (type === 'agent') {
        this.resetOrRemoveControl('agent', 'applicable_agent', i);
      } else if (type === 'tour') {
        this.resetOrRemoveControl('tour', 'applicable_tour', i);
      } else if (type === 'pre_contract') {
        this.resetOrRemoveControl('pre_contract', 'pre_contract', i);
      }
    }

    //Remove row
   
    
    //***** Attachment Add More */

    get attachments() {
      return this.parentForm.controls["attachments"] as FormArray;
    }

    addNewItem(vl: string | { title: any; file: any } = '') {
      const attachments = this.parentForm.controls["attachments"] as FormArray;
    
      if (typeof vl === 'string') {
        vl = { title: vl, file: vl };
      }
      const newItem = new FormGroup({
        'title': new FormControl(vl.title, []),
        'file': new FormControl(vl.file, [])
      });
    
      attachments.push(newItem);
    }

    removeNewItem(i:number){
      const attachments = this.parentForm.controls["attachments"] as FormArray
      // console.log("attachments",attachments,attachments.length);
      if (attachments.length > 1) {
        attachments.removeAt(i)
        this.oldfiles.splice(i, 1); 
          this.parentForm.patchValue({
            oldfiles: this.oldfiles
          });

      } else {
        attachments.reset()
      }
    }

   //***** Attachment Add More */


   //***** Attachment upload */
    mediaFiles: string[] = [];
  
    onFileChange(event: any, index: number) {
      if (event.target.files && event.target.files[0]) {
        const attachments = this.parentForm.get('attachments') as FormArray;
        const fileControl = attachments.at(index).get('file') as FormControl;
    
        const reader = new FileReader();
    
        reader.onload = (event: any) => {
          const imageUrl = event.target.result;
    
          this.mediaFiles[index] = imageUrl;
          this.mediaFiles = this.mediaFiles.filter(file => file !== null);
    
          index = this.mediaFiles.indexOf(imageUrl);
          fileControl.setValue(this.mediaFiles[index]);
    
          // console.log(this.mediaFiles, this.mediaFiles[index], index);
        };
    
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  
   //***** Attachment upload */
    

    
    getImage(media:any) {
      return media.file.url;
    }

    deleteImage(index: number,item:any) {
      if(item == 1){
          this.mediaFiles.splice(index, 1); 
          this.parentForm.patchValue({
            attachments: this.mediaFiles
          });
      }else{
          this.oldfiles.splice(index, 1);
          this.parentForm.patchValue({
            oldfiles: this.oldfiles
          });
      }
    }

    //*******************Image */

    onSubmit() {
       this.submitted = true; 
       if (this.parentForm.valid) {
        let payload = this.parentForm.value;
        payload.id = this._id;
        payload.oldAttch = this.oldfiles;
        payload.oldstatus = this.oldstatus;
        const filteredData = payload.attachments.filter((item: { file: { name: any; }; }) => !item.file || !item.file.name);
        payload.attachments = filteredData;

        console.log("payload",payload,filteredData);
       
        this.apiService.postData('contracts', payload).subscribe(
          (data) => {
            // Handle success
            this.submitted = false;
            this.toastrService.success('Record saved.', 'Success', {
              timeOut: 9000,
              enableHtml: true
            });
            this._router.navigate(['/contracts']);
          },
          (err) => {
            // Handle error
            this.submitted = false;
            if (err.status === 422) {
              // Handle specific error (e.g., validation error)
              const messages = extractErrorMessagesFromErrorResponse(err);
              this.toastrService.error(messages.join('<br />'), 'Error', {
                timeOut: 9000,
                enableHtml: true
              });
            } else {
              // Handle other errors (e.g., server errors)
              console.error('An error occurred:', err); // Log the error for debugging
              this.toastrService.error('Something went wrong', 'Error', {
                timeOut: 9000,
                enableHtml: true
              });
            }
          }
        );
        
      } else {
        // Mark all form controls as touched to display validation errors
        this.markFormGroupTouched(this.parentForm);
        this.submitted = false;
        
      }
    }


    getById(id:string){
      this.apiService.get('contracts/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            console.log("dataSingle",dataSingle);
            this.oldstatus = dataSingle.status; // old Status

            //Status Selected
            const statusWithFlag = dataSingle.status.filter((status: { current_flag: string; }) => status.current_flag === "1");
            if (statusWithFlag.length > 0) {
              this.slectedStatus = statusWithFlag[0].id;
            }
         
            this.parentForm.patchValue({
              "company":dataSingle.company?dataSingle.company.id:'',
              "requested":dataSingle.requested?dataSingle.requested.staffId:'',
              "office":dataSingle.office?dataSingle.office.id:'',
              "supplier":dataSingle.supplier?dataSingle.supplier.id:'',

              "contract_no":dataSingle.contract_no?dataSingle.contract_no:'',
              "executed":dataSingle.executed?dataSingle.executed.staffId:'',
              "applicable_agent":dataSingle.applicable_agent?dataSingle.applicable_agent.refnumber:'',
              "approval":dataSingle.approval?dataSingle.approval.id:'',
              
              "sdegination":dataSingle.signed?dataSingle.signed.degination:'',
              "sdepartment":dataSingle.signed?dataSingle.signed.department:'',
              "semail":dataSingle.signed?dataSingle.signed.email:'',
              "sname":dataSingle.signed?dataSingle.signed.name:'',
              "sphone":dataSingle.signed?dataSingle.signed.phone:'',

              // "status":this.slectedStatus?this.slectedStatus.id:'',
            })

            if(dataSingle.applicable_dates){
              const applicable_dates = [new Date(dataSingle.applicable_dates.from),new Date(dataSingle.applicable_dates.to)];
              this.parentForm.patchValue({
                "applicable_dates":applicable_dates
              })
            }

            if(dataSingle.applicable_tourtype.length >0){
              dataSingle.applicable_tourtype.map((item:any) =>{
                item != null ?  this.add('tour_type',item.id) :  this.add('tour_type');
              })
            }

            if(dataSingle.applicable_tour.length >0){
              dataSingle.applicable_tour.map((item:any) =>{
                item != null ?  this.add('tour',item.id) :  this.add('tour');
              })
            }

            if(dataSingle.pre_contract.length >0){
              dataSingle.pre_contract.map((item:any) =>{
                item != null ?  this.add('pre_contract',item.id) :  this.add('pre_contract');                
              })
            }
            
            if(dataSingle.applicable_agent.length >0){
              dataSingle.applicable_agent.map((item:any) =>{
                item != null ?  this.add('agent',item.refnumber) :  this.add('agent');
              })
            }

            if (dataSingle.attachments && dataSingle.attachments.length > 0) {
              dataSingle.attachments.map((item: any) => {
                const newItem = {
                  title: item.title,
                  file: item.file
                };
                console.log("newItem",newItem);
                this.addNewItem(newItem);
              });
            }
            this.oldfiles = dataSingle.attachments;

          }
        },
        (err) => {
          console.error('Error fetching contracts data:', err);
        }
      );
    }

    
    init() {
      this.apiService.init('contracts_init').subscribe(
       (data) => {
           this.company = data.companies.map(function(item:any){
               item.text = item.name;
               return item;
           });
         
         this.office = data.offices.map(function(item:any){
           item.text = item.name;
           return item;
         });

         this.executed = data.executed.map(function(item:any){
           item.text = item.staff.name;
           item.id = item.staffId;
           return item;
         });

         this.tour = data.applicable_tour.map(function(item:any){
           item.text = item.name;
           return item;
         });

         this.agent = data.applicable_agent.map(function(item:any){
           item.text = item.name;
           item.id = item.refnumber;
           return item;
         });

         this.pContract = data.pre_contract.map(function(item:any){
           item.text = item.contract_no;
           item.id = item._id;
           return item;
         });

         this.staff = data.staff.map(function(item:any){
           item.text = item.name;
           return item;
         });

         this.status = data.status.map(function(item:any){
           item.text = item.name;
           return item;
         });

         this.suppliers = data.suppliers.map(function(item:any){
           item.text = item.name;
           return item;
         });

         this.tTypes = data.tour_types.map(function(item:any){
           item.text = item.name;
           return item;
         });
         
       },
       (error) => {
         console.error('Error fetching contracts data:', error);
       }
     );
   }   

    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    }

  
}
