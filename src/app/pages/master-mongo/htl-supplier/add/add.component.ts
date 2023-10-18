import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/helpers/helpers';
import { StatusCodeService, StatusCodes } from '../../../../core/services/status-code.service';

//Other Add More Component
import { CloseDaysComponent } from '../close-days/close-days.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { FreePolicyComponent } from '../free-policy/free-policy.component';
import { FeedbacksComponent } from '../feedbacks/feedbacks.component';
import { CancellationPolicyComponent } from '../cancellation-policy/cancellation-policy.component';
import { PaymentPolicyComponent } from '../payment-policy/payment-policy.component';


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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  parentForm: FormGroup;
  submitted = false; // button
  breadCrumbItems!: Array<{}>;

  isFirstOpen = true //accordian
  suppliers: any;
  countries: any;
  cities: any;
  currencies: any;
  age: any;
  rating: any;
  days: any;
  phonecode: any;
  languages: any;

  //child component add more section
  @ViewChild(CloseDaysComponent) closeDaysComponent!: CloseDaysComponent; 
  @ViewChild(AccountsComponent) accountsComponent!: AccountsComponent; 
  @ViewChild(FreePolicyComponent) freePolicyComponent!: FreePolicyComponent; 
  @ViewChild(FeedbacksComponent) feedbacksComponent!: FeedbacksComponent; 
  @ViewChild(CancellationPolicyComponent) cancellationPolicyComponent!: CancellationPolicyComponent; 
  @ViewChild(PaymentPolicyComponent) paymentPolicyComponent!: PaymentPolicyComponent; 

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
      this.parentForm = this.formBuilder.group({
        name: ['', ''],
        sname: ['', ''],
        supplier: ['', ''],
        country_cd: ['', ''],
        city_cd: ['', ''],
        address_1: ['', ''],
        address_2: ['', ''],
        address_3: ['', ''],
        geo_location: ['', ''],
        native_name: ['', ''],
        description: ['', ''],
        max_child_age: ['', ''],
        max_infant_age: ['', ''],
        star_rating: ['', ''],
        currency: ['', ''],
        utl:['', ''],
        critical_supplier:['', ''],
        hq_id:['', ''],
        allotment_release_days:['', ''],
        chain_id:['', ''],

        // tab 3
        automated_bookings:['',''],
        preferred_communication:['',''],
        driver_guide_room_req:['',''],
        voucher_flag:['',''],
        online_conf:['',''],

        // tab 4
        key_isd:['',''],
        key_phone:['',''],
        alt_isd:['',''],
        alt_phone:['',''],
        res_ph_group_isd:['',''],
        res_ph_group_phone:['',''],
        res_ph_fit_isd:['',''],
        res_ph_fit_phone:['',''],
        key_email:['',''],
        alt_email:['',''],
        res_email_group:['',''],
        res_email_fit:['',''],
        emergency_phone_isd:['',''],
        emergency_phone:['',''],
        title:['',''],
        first_name:['',''],
        last_name:['',''],

        //tab 
        hotel_style:['',''],
        bathtub:['',''],
        wifi:['',''],
        supported_socket:['',''],


      });
    }

    items = [
      { tab: 'Supplier Details', contentKey: 'tabSupplierDetails',disabledCheck:false,tabIndex:0 },
      { tab: 'Text and Media Starts', content: 'tabTextMedia',disabledCheck:true,tabIndex:1 },
      { tab: 'Booking conditions Starts', content: 'tabBookings',disabledCheck:true,tabIndex:2 },
      { tab: 'Contact Starts', content: 'tabStarts',disabledCheck:true,tabIndex:3 },
      { tab: 'Close Days Starts', content: 'tabCloseDays',disabledCheck:true,tabIndex:4 },
      { tab: 'Generic Free Policy Starts', content: 'tabPolicy',disabledCheck:true,tabIndex:5 },
      { tab: 'Generic Cancellation Policy Starts', content: 'tabCancellationPolicy',disabledCheck:true,tabIndex:6 },
      { tab: 'Reviews Starts', content: 'tabReview',disabledCheck:true,tabIndex:7 },
    ];
    
    supplier_media = [
      { text: 'Image' , 'id':1 },
      { text: 'Video' , 'id':2 },
    ];

    emergency_contact_title = [
      { text: 'Mr.' , 'id':1 },
      { text: 'Ms.' , 'id':2 },
    ];

    hotel =  [
      { text: 'Hostel' , 'id':'hostel' }
    ];



    imageURL: any;
    files: File[] = [];

    onSelect(event: any) {
      this.files.push(...event.addedFiles);
      let file: File = event.addedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        setTimeout(() => {
          // this.profile.push(this.imageURL)
        }, 100);
      }
      reader.readAsDataURL(file)
    }
    onRemove(event: any) {
      this.files.splice(this.files.indexOf(event), 1);
    }
  
    
    
    location:any=[];
    getAddress(geoData:any){    
      this.location = geoData;
    }

    onValueChanged() {
      console.log("desc");
    }

    _id:'' | undefined;
    ngOnInit(): void {
      this._id = this._activatedroute.snapshot.params['id'];
      this.init();
      
      if(this._id){
        this.breadCrumbItems = [{ label: 'Htl Supplier' }, { label: 'Update', active: true }];
        this.getById(this._id);
      } else {
        this.breadCrumbItems = [{ label: 'Htl Supplier' }, { label: 'Add', active: true }];
      }
    }
  

    onSubmit() {
      this.submitted = true; 
      let parentFormValue = this.parentForm.value;
  
      // const closeDaysFormValue = this.closeDaysComponent.productForm.value;
      // const accountsFormValue = this.accountsComponent.productForm.value;
      // const freePolicyFormValue = this.freePolicyComponent.productForm.value;
      // const feedbacksFormValue = this.feedbacksComponent.productForm.value;
      // const cancellationFormValue = this.cancellationPolicyComponent.productForm.value;
      // const paymentPolicyFormValue = this.paymentPolicyComponent.productForm.value;

      // const mergedFormValue = { ...parentFormValue, ...closeDaysFormValue, ...accountsFormValue, ...freePolicyFormValue
      //   , ...feedbacksFormValue, ...cancellationFormValue, ...paymentPolicyFormValue };

      console.log("payload",parentFormValue);
    //   if (this.parentForm.valid) {
    //    let payload = this.parentForm.value;
    //    payload.id = this._id;
    //    payload.oldAttch = this.oldfiles;
    //    payload.oldstatus = this.oldstatus;
    //    const filteredData = payload.attachments.filter((item: { file: { name: any; }; }) => !item.file || !item.file.name);
    //    payload.attachments = filteredData;

    //    console.log("payload",payload,filteredData);
      
       this.apiService.postData('htl-supplier', parentFormValue).subscribe(
         (data) => {
           // Handle success
           this.submitted = false;
           this.toastrService.success('Record saved.', 'Success', {
             timeOut: 9000,
             enableHtml: true
           });
           this._router.navigate(['/htl-supplie']);
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
       
    //  } else {
    //    // Mark all form controls as touched to display validation errors
    //    this.markFormGroupTouched(this.parentForm);
    //    this.submitted = false;
       
    //  }
   }


   getById(id:string){
     this.apiService.get('htl-supplier/'+id).subscribe(
       (data) => {
         if(data.length == 1){
           let dataSingle = data[0];

           console.log("dataSingle",dataSingle);
    //        console.log("dataSingle",dataSingle);
    //        this.oldstatus = dataSingle.status; // old Status

    //        //Status Selected
    //        const statusWithFlag = dataSingle.status.filter((status: { current_flag: string; }) => status.current_flag === "1");
    //        if (statusWithFlag.length > 0) {
    //          this.slectedStatus = statusWithFlag[0].id;
    //        }

    const quantitiesFormArray = this.closeDaysComponent.productForm.get('quantities') as FormArray;

    if (dataSingle.quantities && dataSingle.quantities.length > 0) {
      // Create form controls for each quantity and add them to the FormArray
      dataSingle.quantities.forEach((item: any) => {
        quantitiesFormArray.push(
          this.formBuilder.group({
            qty: [item.qty],
            price: [item.price],
          })
        );
      });
    }
    
console.log("quantitiesFormArray",quantitiesFormArray);
    // const childFormValue = this.closeDaysComponent.productForm.value;
    // console.log("quantitiesFormArray",childFormValue);
    // this.closeDaysComponent.productForm.patchValue({

    // })

    // if(dataSingle.quantities && dataSingle.quantities.length >0){
    //   dataSingle.quantities.map((item:any) =>{
    //     let qty = item.qty?item.qty:'';
    //     let price = item.price ? item.price :'';
    //   })
   
    // } 

    //        this.parentForm.patchValue({
    //          "company":dataSingle.company?dataSingle.company.id:'',
    //          "requested":dataSingle.requested?dataSingle.requested.staffId:'',
    //          "office":dataSingle.office?dataSingle.office.id:'',
    //          "supplier":dataSingle.supplier?dataSingle.supplier.id:'',

    //          "contract_no":dataSingle.contract_no?dataSingle.contract_no:'',
    //          "executed":dataSingle.executed?dataSingle.executed.staffId:'',
    //          "applicable_agent":dataSingle.applicable_agent?dataSingle.applicable_agent.refnumber:'',
    //          "approval":dataSingle.approval?dataSingle.approval.id:'',
             
    //          "sdegination":dataSingle.signed?dataSingle.signed.degination:'',
    //          "sdepartment":dataSingle.signed?dataSingle.signed.department:'',
    //          "semail":dataSingle.signed?dataSingle.signed.email:'',
    //          "sname":dataSingle.signed?dataSingle.signed.name:'',
    //          "sphone":dataSingle.signed?dataSingle.signed.phone:'',

    //          // "status":this.slectedStatus?this.slectedStatus.id:'',
    //        })

    //        if(dataSingle.applicable_dates){
    //          const applicable_dates = [new Date(dataSingle.applicable_dates.from),new Date(dataSingle.applicable_dates.to)];
    //          this.parentForm.patchValue({
    //            "applicable_dates":applicable_dates
    //          })
    //        }

    //        if(dataSingle.applicable_tourtype.length >0){
    //          dataSingle.applicable_tourtype.map((item:any) =>{
    //            item != null ?  this.add('tour_type',item.id) :  this.add('tour_type');
    //          })
    //        }

    //        if(dataSingle.applicable_tour.length >0){
    //          dataSingle.applicable_tour.map((item:any) =>{
    //            item != null ?  this.add('tour',item.id) :  this.add('tour');
    //          })
    //        }

    //        if(dataSingle.pre_contract.length >0){
    //          dataSingle.pre_contract.map((item:any) =>{
    //            item != null ?  this.add('pre_contract',item.id) :  this.add('pre_contract');                
    //          })
    //        }
           
    //        if(dataSingle.applicable_agent.length >0){
    //          dataSingle.applicable_agent.map((item:any) =>{
    //            item != null ?  this.add('agent',item.refnumber) :  this.add('agent');
    //          })
    //        }

    //        if (dataSingle.attachments && dataSingle.attachments.length > 0) {
    //          dataSingle.attachments.map((item: any) => {
    //            const newItem = {
    //              title: item.title,
    //              file: item.file
    //            };
    //            console.log("newItem",newItem);
    //            this.addNewItem(newItem);
    //          });
    //        }
    //        this.oldfiles = dataSingle.attachments;

         }
       },
       (err) => {
         console.error('Error fetching contracts data:', err);
       }
     );
   }


  //  setMasterData(data: any, tabIndex: number) {
  //   if (tabIndex === 0) {
  //     // Handle data for tab 0
  //   } else if (tabIndex === 1) {
  //     // Handle data for tab 1
  //   } else {
  //     // Handle other tab indexes or provide a default behavior.
  //   }
  // }

  onSupplierMediaChange() {
    console.log('Selected value:', this.supplier_media);    // Handle changes based on the selected value, e.g., toggle a boolean.
    // You can add additional logic here.
  }

  closeDataArray: any[] = [
    {
      close_dates: '',
      applicable_days: '',
      language: '',
      description: ''
    }
  ];

  formDataArray: any[] = [
    {
      itinerary_text: '',
      supplier_media: '',
      video: ''
    }
  ];

  addRow(type:any) {
    console.log("type",type);
    if(type == "media"){
      this.formDataArray.push({
        itinerary_text: '',
        supplier_media: '',
        video: ''
      });
    }else if(type == "close"){
      this.closeDataArray.push({
        close_dates: '',
        applicable_days: '',
        language: '',
        description: ''
      });
    }
   
  }
  removeRow(type:any,index: number) {
    if(type == "media"){
      this.formDataArray.splice(index, 1);
    }else if(type == "close"){
      this.closeDataArray.splice(index, 1);
    }
  }
   
   init() {
     this.apiService.init('htl-supplier/init').subscribe(
      (data) => {

            // if(data.tabIndex){
            //   tabIndex = data.tabIndex;
            // }

            // if (tabIndex === 0) {
            
            const age = [];
            for (let i = 1; i <= 15; i++) {
              age.push({ text: i.toString(), id: i });
            }
            this.age = age;

            const rating = [];
            for (let i = 1; i <= 5; i++) {
              rating.push({ text: i.toString(), id: i });
            }
            this.rating = rating;

            const days = [];
            for (let i = 1; i <= 15; i++) {
              days.push({ text: i.toString()+' days', id: i });
            }
            this.days = days;

            this.suppliers = data.supp_types.map(function(item:any){
                item.text = item.name;
                return item;
            });

            this.countries = data.countries.map(function(item:any){
              item.text = item.name;
              return item;
            });

            this.cities = data.cities.map(function(item:any){
              item.text = item.name;
              return item;
            });
    
            this.currencies = data.currencies.map(function(item:any){
              item.text = item.name;
              return item;
            });

            // tabIndex == 4
            this.phonecode = data.phonecode.map(function(item:any){
              item.id = item.isdCode;
              item.text = item.isdCode;
              return item;
            });

            // tabIndex == 5
            this.languages = data.languages.map(function(item:any){
              item.id = item.code;
              item.text = item.name;
              return item;
            });
            console.log('languages parent', this.languages); 
            console.log('rating parent', this.rating); 

            
          
          // } else if (tabIndex === 1) {
          // } else {
          // }
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
