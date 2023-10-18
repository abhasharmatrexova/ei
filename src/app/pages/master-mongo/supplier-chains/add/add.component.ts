import { Component,Inject,Input,inject  } from '@angular/core';
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

  country:any; 
  city:any; 
  phonecode:any; 
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedSupplierType = 'Select Country';
  parentForm: FormGroup;
  _id:'' | undefined;
  locationData:any = [];
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute, @Inject(Router) private _router:Router
    ){
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],
        country: ['', ''],
        city: ['', ''],
        address1: ['', ''],
        address2: ['', ''],
        address3: ['', ''],
        location: ['', ''],
        phone_code: ['', ''],
        phone_no: ['', ''],
        alt_phone_code: ['', ''],
        alt_phone_no: ['', ''],
        main_email: ['', ''],
        alt_email: ['', ''],
      });
    }

    init() {
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('supplier-chain/init').subscribe(
        (data) => {
          this.country = data.countries.map(function(item:any){
            item.text = item.name;
            return item;
          });
          this.city = data.cities.map(function(item:any){
            item.text = item.name;
            return item;
          });
          this.phonecode = data.phonecode.map(function(item:any){
            item.id = item.isdCode;
            item.text = item.isdCode;
            return item;
          });
          // console.log("res",data); // Add a log statement to see if data is received
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

    // onValueChanged() {
    //   console.log("test");
    // }

    getById(id:string){
      this.apiService.get('supplier-chain/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            this.locationData = dataSingle.location; 
            // console.log("Update Data",dataSingle);
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "country":dataSingle.country.id,
              "city":dataSingle.city.id,
              "address1":dataSingle.address1,
              "address2":dataSingle.address2,
              "address3":dataSingle.address3,
              "location":dataSingle.location.name,
              "phone_code":dataSingle.key_phone.phone_code,
              "phone_no":dataSingle.key_phone.phone,
              "alt_phone_code":dataSingle.alt_phone?dataSingle.alt_phone.phone_code:'',
              "alt_phone_no":dataSingle.alt_phone?dataSingle.alt_phone.phone:'',
              "main_email":dataSingle.main_email,
              "alt_email":dataSingle.alt_email,
            })
          }
          
          // console.log("supplier chain details`",data); // Add a log statement to see if data is received
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

     this.breadCrumbItems = [{ label: 'Supplier Chains' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'Supplier Chains' }, { label: 'Add', active: true }];
    }
  }
    onSubmit() {
      // console.log(this.parentForm,'testing here')
      this.submitted = true; 
      if (this.parentForm.valid) {
        // Handle form submission here
        let payload = this.parentForm.value;
        payload.id = this._id;
        payload.location = this.locationData;
        this.apiService.postData('supplier-chain',payload).subscribe(
          (data) => {
            this.submitted = false;
            this.toastService.success('Record saved.', 'Success', {
              timeOut: 9000,
              enableHtml: true
            }); // Add a log statement to see if data is received
  
            this._router.navigate(['/supplier-chains']);
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
    getAddress(geoData:any){
      this.locationData = geoData;
      //console.log(geoData,'return');
    }
}
