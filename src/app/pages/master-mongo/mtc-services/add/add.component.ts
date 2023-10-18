import { Component,Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service'; 
import { HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/helpers/helpers';
import { ActivatedRoute,Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  service_types:any;
  languages:any;
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedRSTType = 'Select Country';
  parentForm: FormGroup;
  _id:'' | undefined;
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute, @Inject(Router) private _router:Router
    
    
    )
    {
      // this.route = this._activatedroute.snapshot;

      //Validations
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],        
        service_type: ['', ''],
        ldc_flag: ['', ''],
        max_km_per_day: ['', ''],
        max_hr_per_day: ['', ''],
        no_of_days: ['', ''],
        min_capacity: ['', ''],
        max_capacity: ['', ''],       
        
        // code: ['', Validators.required],
        // name: ['', Validators.required],
        // rst_type: ['', Validators.required],
        // adults: ['', Validators.required],
        // children: ['', Validators.required],
        // infants: ['', Validators.required],
        // double_beds: ['', Validators.required],
        // single_beds: ['', Validators.required],
        // cots: ['', Validators.required],
        // twin_beds: ['', Validators.required],
        // service_beds: ['', Validators.required],
        // king_beds: ['', Validators.required],
        // queen_beds: ['', Validators.required],
      });
    }

    init() {
      
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('mtc-service/init').subscribe(
        (data) => {
         
          this.service_types = data.service_types.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          
          
          // console.log("rst_type`",data); // Add a log statement to see if data is received
        },
        (error) => {
          // console.error('Error fetching country data:', error);
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
   
    getById(id:string){
      this.apiService.get('mtc-service/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "service_type":dataSingle.service_type.id,
              "ldc_flag":dataSingle.ldc_flag,
              "max_km_per_day":dataSingle.ldc_limits.max_km_per_day,
              "max_hr_per_day":dataSingle.ldc_limits.max_hr_per_day,
              "no_of_days":dataSingle.ldc_limits.no_of_days,
              "min_capacity":dataSingle.min_capacity,
              "max_capacity":dataSingle.max_capacity
            })
          }
          
          // console.log("rsts details`",data); // Add a log statement to see if data is received
        },
        (error) => {
          // console.error('Error fetching country data:', error);
        }
      );
    }


  ngOnInit(): void {
    this._id = this._activatedroute.snapshot.params['id'];
    this.init();
    
    if(this._id){

     this.breadCrumbItems = [{ label: 'MTC Service' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'MTC Service' }, { label: 'Add', active: true }];
    }
  }

  onSubmit() {
    // console.log(this.parentForm,'testing here')
    
    this.submitted = true; 
    if (this.parentForm.valid) {
      // Handle form submission here
      let payload = this.parentForm.value;
      payload.id = this._id;
      this.apiService.postData('mtc-service',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/mtc-services']);
        },
        (err) => {
          this.submitted = false;
          // console.error('Error fetching country data:', err);
          if(err.status == 422){              
            const messages =  extractErrorMessagesFromErrorResponse(err);
          //  console.log(messages,'msggg')
            this.toastService.error(messages.join('<br />'), 'Error', {
              timeOut: 9000,
              enableHtml: true
            });
          } else {
            this.toastService.error('Something went wrong', 'Error', {
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
  ldcflagChanged(val:any){
    // console.log(this.parentForm.controls['ldc_flag'].value,'select')
  }
}
