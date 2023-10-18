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
  ferry_types:any;
  ferry_classs:any;
  rooms:any; 
  cities:any; 
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedFerryType = 'Select Country';
  parentForm: FormGroup;
  ferryRouteItemForm: FormGroup | undefined;
  _id:'' | undefined;
  fromLocation:any=[];
  toLocation:any=[];
  locationPayload:any=[];

  
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public toastService: ToastrService,
    @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute, @Inject(Router) private _router:Router
    
    
    )
    {
     
      //Validations
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],
        ferry_type: ['', ''],
        ferry_class: ['', ''],
        from_city: ['', ''],
        from_location: ['', ''],
        to_city: ['', ''],
        to_location: ['', ''],
        room: ['',''],
        ferryRoute_details: this.formBuilder.array([])
      });
    }

    init() {
      
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('ferry-service/init').subscribe(
        (data) => {
         
          this.ferry_types = data.ferry_types.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.ferry_classs = data.ferry_classs.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.cities = data.cities.map(function(item:any){
            item.text = item.name;
            item.country = item.country.name;
            return item;
          });

          this.rooms = data.rooms.map(function(item:any){
            item.text = item.name;
            item.id = item._id;
            return item;
          });
          // console.log("ferry_type`",data); // Add a log statement to see if data is received
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
      this.apiService.get('ferry-service/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "ferry_type":dataSingle.ferry_type.id,
              "ferry_class":dataSingle.ferry_class.id,
              "from_city":dataSingle.from_city.id,
              "room":dataSingle.room._id,
              "from_location":dataSingle.from_city.geo_location?dataSingle.from_city.geo_location.name:'',
              "to_city":dataSingle.to_city.id,
              "to_location":dataSingle.to_city.geo_location?dataSingle.to_city.geo_location.name:'',
              // "ferryRoute_validity":dataSingle.ferryRoute_validity,
              //"ferryRoute_details":dataSingle.ferryRoute_details
            })
            this.fromLocation = dataSingle.from_city.geo_location?dataSingle.from_city.geo_location:[];
            this.toLocation = dataSingle.to_city.geo_location?dataSingle.to_city.geo_location:[];
            if(dataSingle.route && dataSingle.route.length >0){
              dataSingle.route.map((item:any) =>{
                let city_id = item.city?item.city.id:'';
                let geo_name = item.city && item.city.geo_location?item.city.geo_location.name:'';
                this.addNewItem(city_id,geo_name);
                if(item.city && item.city.geo_location)
                  this.locationPayload.push(item.city.geo_location);
              })
            } else {
                this.addNewItem();

            }
          }
          
          // console.log("ferrys details`",data); // Add a log statement to see if data is received
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

     this.breadCrumbItems = [{ label: 'Ferry Services' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'Ferry Services' }, { label: 'Add', active: true }];
     this.addNewItem();

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
      payload.ferryLocation = this.locationPayload;
      this.apiService.postData('ferry-service',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/ferry-services']);
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

  get ferryRoute_details() {
    return this.parentForm.controls["ferryRoute_details"] as FormArray;
  }
  addNewItem(city:string='',geo_location:string=''){
    const ferryRoute_details = this.parentForm.controls["ferryRoute_details"] as FormArray;
    const newItem = new FormGroup({
      'city': new FormControl(city, []),
      'geo_location': new FormControl(geo_location, []),
    })
    ferryRoute_details.push(newItem);
    setTimeout(() => {
      this.initMap();      
    }, 1000);
  }
  removeNewItem(i:number){
    const ferryRoute_details = this.parentForm.controls["ferryRoute_details"] as FormArray
    if (ferryRoute_details.length > 1) {
      ferryRoute_details.removeAt(i)
    } else {
      ferryRoute_details.reset()
    }
    // this.ferryRoute_details.removeAt(index);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
   let slides = document.getElementsByClassName('google-autocomplete');
    let autocomplete:any = [];
    for (var i = 0; i < slides.length; i++) {
      this.setupAutocomplete(autocomplete,slides[i].id,i);
    }
    
   
    }
    private  setupAutocomplete(autocomplete:any, inputsId: string, i: number) {
      let input = document.getElementById(inputsId) as HTMLInputElement;
      if(input){
        let autocomplete = new google.maps.places.Autocomplete(input);
    
          autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();      
              if (!place.geometry || !place.geometry.location) {
                return;
              }
              let location = place.geometry.location;
    
              let res = {
                lat:location.lat(),
                lng:location.lng(),
                name:place.name,
                place_id:place.place_id,
              }
              this.locationPayload[i] = res;
             
              });
      }
    }
    customSearchFn(term: string, item: any) {
    
    const nameMatch = item.name.toLowerCase().includes(term.toLowerCase());
    const countryMatch = item.country.toLowerCase().includes(term.toLowerCase());
    return nameMatch || countryMatch;

  }
}
