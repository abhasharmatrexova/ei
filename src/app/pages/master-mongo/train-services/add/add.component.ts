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
  Validators,
  FormArray
} from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  train_types:any;
  train_classs:any; 
  cities:any; 
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedTrainType = 'Select Country';
  parentForm: FormGroup;
  menuItemForm: FormGroup | undefined;
  _id:'' | undefined;
  fromLocation:any=[];
  toLocation:any=[];

  
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute, @Inject(Router) private _router:Router
    
    
    )
    {
      // this.route = this._activatedroute.snapshot;
      this.menuItemForm = this.formBuilder.group({
        name: new FormControl('', []),
      });
      //Validations
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],
        train_type: ['', ''],
        train_class: ['', ''],
        from_city: ['', ''],
        from_location: ['', ''],
        to_city: ['', ''],
        to_location: ['', ''],
        
      });
    }

    init() {
      
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('train-service/init').subscribe(
        (data) => {
         
          this.train_types = data.train_types.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.train_classs = data.train_classs.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.cities = data.cities.map(function(item:any){
            item.text = item.name;
            return item;
          });
          // console.log("train_type`",data); // Add a log statement to see if data is received
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
      console.log("test");
    }
    getById(id:string){
      this.apiService.get('train-service/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "train_type":dataSingle.train_type.id,
              "train_class":dataSingle.train_class.id,
              "from_city":dataSingle.from_city.id,
              "from_location":dataSingle.from_city.geo_location?dataSingle.from_city.geo_location.name:'',
              "to_city":dataSingle.to_city.id,
              "to_location":dataSingle.to_city.geo_location?dataSingle.to_city.geo_location.name:'',
              // "menu_validity":dataSingle.menu_validity,
              //"menu_details":dataSingle.menu_details
            })
            this.fromLocation = dataSingle.from_city.geo_location?dataSingle.from_city.geo_location:[];
            this.toLocation = dataSingle.to_city.geo_location?dataSingle.to_city.geo_location:[];
          }
          
          // console.log("trains details`",data); // Add a log statement to see if data is received
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

     this.breadCrumbItems = [{ label: 'Train Services' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'Train Services' }, { label: 'Add', active: true }];
    }
  }

  onSubmit() {
    // console.log(this.parentForm,'testing here')
    
    this.submitted = true; 
    if (this.parentForm.valid) {
      // Handle form submission here
      let payload = this.parentForm.value;
      payload.id = this._id;
      payload.from_location = this.fromLocation;
      payload.to_location = this.toLocation;
      this.apiService.postData('train-service',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/train-services']);
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
    this.fromLocation = geoData;
    // console.log(geoData,'return');
  }
  getAddress1(geoData:any){    
    this.toLocation = geoData;
    // console.log(geoData,'return');
  }
}
