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

  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedRoomType = 'Select Country';
  parentForm: FormGroup;
  _id:'' | undefined;
  cities: any;
  countries: any;
  location:any = [];
  oldfiles: any;
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
      country: ['', ''],
      city: ['', ''],
      start_date: ['', ''],
      end_date: ['', ''],
      name: ['', ''],
      details: ['', ''],
      web_link: ['', ''],
      location: ['', ''],
      rank: ['', ''],
      htl_markup_percent: ['', ''],
      rst_markup_percent: ['', ''],
      mtc_markup_percent: ['', ''],
      gui_markup_percent: ['', ''],  
      ent_markup_percent: ['', ''],  
      trn_markup_percent: ['', ''],  
      fry_markup_percent: ['', ''],  
      images: ['', ''] ,
      file:['','']
      });
   }

   getAddress(geoData:any){
    this.location = geoData;
    console.log(geoData,'return');
  }

  //*******************Image */
  mediaFiles: string[] = []; // Initialize an empty array to store base64-encoded images

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.mediaFiles.push(event.target.result); // Push base64-encoded image into the array
          this.parentForm.patchValue({
            images: this.mediaFiles
          });
        };
  
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  
  getImage(media:any) {
    return media ? media : media.url;
  }

  deleteImage(index: number,item:any) {
    if(item == 1){
        this.mediaFiles.splice(index, 1); // Remove the image from the upload array
        this.parentForm.patchValue({
          images: this.mediaFiles
        });
    }else{
        this.oldfiles.splice(index, 1); // Remove the image from the oldarray
        this.parentForm.patchValue({
          oldfiles: this.oldfiles
        });
    }
  }

  //*******************Image */
  

   init() {

    setTimeout(() => {
      this.apiService.init('events_init').subscribe(
        (data) => {
          
          this.countries = data.countries.map(function(item:any){
            item.text = item.name;
            return item;
          });
 
          this.cities = data.cities.map(function(item:any){
           item.text = item.name;
           return item;
         });
        },
        (error) => {
        }
      );
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 2000)
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
     this.apiService.get('events_fairs_holidays/'+id).subscribe(
       (data) => {
         if(data.length == 1){
           let dataSingle = data[0];
           this.oldfiles = dataSingle.images;

           this.parentForm.patchValue({
             "country":dataSingle.country.id,
             "city":dataSingle.city.id,
             "name":dataSingle.name,
             "start_date":dataSingle.start_date,
             "end_date":dataSingle.end_date,
             "details":dataSingle.details,
             "web_link":dataSingle.web_link,
             "location":dataSingle.location.name,
             "rank":dataSingle.rank,
             "htl_markup_percent":dataSingle.htl_markup_percent,
             "rst_markup_percent":dataSingle.rst_markup_percent,
             "mtc_markup_percent":dataSingle.mtc_markup_percent,
             "gui_markup_percent":dataSingle.gui_markup_percent,
             "ent_markup_percent":dataSingle.ent_markup_percent,
             "trn_markup_percent":dataSingle.trn_markup_percent,
             "fry_markup_percent":dataSingle.fry_markup_percent,
            
           })
         }
         
         console.log("rooms details`",data); // Add a log statement to see if data is received
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

    this.breadCrumbItems = [{ label: 'Events Fair Holidays' }, { label: 'Update', active: true }];
    this.getById(this._id);
   } else {
    this.breadCrumbItems = [{ label: 'Events Fair Holidays' }, { label: 'Add', active: true }];
   }
 }

 onSubmit() {
   // console.log(this.parentForm,'testing here')
   
   this.submitted = true; 
   if (this.parentForm.valid) {
     // Handle form submission here
     let payload = this.parentForm.value;
     payload.id = this._id;
     payload.oldAttch = this.oldfiles;
     payload.google_location = this.location;
    
     console.log("payload",payload);
     this.apiService.postData('events_fairs_holidays',payload).subscribe(
       (data) => {
         this.submitted = false;
         this.toastService.success('Record saved.', 'Success', {
           timeOut: 9000,
           enableHtml: true
         }); // Add a log statement to see if data is received

         this._router.navigate(['/fairs-events-festivals']);
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
}
