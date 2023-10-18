import { Component,Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service'; 
import { HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { extractErrorMessagesFromErrorResponse } from 'src/app/core/helpers/helpers';
import { weekDays } from 'src/app/core/helpers/weekDays';
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
  ent_types:any;
  countries:any;
  applicable_days_list=weekDays();
  cities:any;
  languages:any;
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedRSTType = 'Select Country';
  parentForm: FormGroup;
  _id:'' | undefined;
  locationData:any = [];
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute, @Inject(Router) private _router:Router
    
    
    )
    {
     
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],        
        ent_type: ['', ''],
        country: ['', ''],
        city: ['', ''],
        geo_location: ['', ''],
        location: ['', ''],
        description: ['', ''],
        applicable_period_from: ['', ''],       
        applicable_period_to: ['', ''],       
        applicable_days: ['', ''],       
        applicable_time_from: ['', ''],      
        applicable_time_to: ['', ''],   
      });
    }

    init() {
      this.apiService.init('ent-service/init').subscribe(
        (data) => {
         
          this.ent_types = data.ent_types.map(function(item:any){
            item.text = item.fullName;
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
    onValueChanged() {
      // console.log("test");
    }
    getById(id:string){
      this.apiService.get('ent-service/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            this.locationData = dataSingle.geo_location; 
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "ent_type":dataSingle.ent_type.id,
              "country":dataSingle.country.id,
              "city":dataSingle.city.id,
              "location":dataSingle.geo_location.name,
              "applicable_period_from":dataSingle.applicable_period_from,
              "applicable_period_to":dataSingle.applicable_period_to,
              "applicable_time_from":dataSingle.applicable_time_from,
              "applicable_time_to":dataSingle.applicable_time_to,
              "applicable_days":dataSingle.applicable_days,
              "description":dataSingle.description,
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

     this.breadCrumbItems = [{ label: 'ENT Service' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'ENT Service' }, { label: 'Add', active: true }];
    }
  }

  onSubmit() {
    // console.log(this.parentForm,'testing here')
    
    this.submitted = true; 
    if (this.parentForm.valid) {
      // Handle form submission here
      let payload = this.parentForm.value;
      payload.id = this._id;
      payload.geo_location = this.locationData;
      this.apiService.postData('ent-service',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/ent-services']);
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
    console.log(geoData,'return');
  }
  countryChanged(data:any){
    console.log(this.parentForm.controls['country'].value,'select')
  }
}
