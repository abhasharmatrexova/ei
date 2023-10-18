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
  // private route = inject(Router);
  room_types:any; 
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedRoomType = 'Select Country';
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
        room_types: ['', ''],
        adults: ['', ''],
        children: ['', ''],
        infants: ['', ''],
        double_beds: ['', ''],
        single_beds: ['', ''],
        cots: ['', ''],
        twin_beds: ['', ''],
        extra_beds: ['', ''],
        king_beds: ['', ''],
        queen_beds: ['', ''],
        
        // code: ['', Validators.required],
        // name: ['', Validators.required],
        // room_types: ['', Validators.required],
        // adults: ['', Validators.required],
        // children: ['', Validators.required],
        // infants: ['', Validators.required],
        // double_beds: ['', Validators.required],
        // single_beds: ['', Validators.required],
        // cots: ['', Validators.required],
        // twin_beds: ['', Validators.required],
        // extra_beds: ['', Validators.required],
        // king_beds: ['', Validators.required],
        // queen_beds: ['', Validators.required],
      });
    }

    init() {
      
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('room_types_init').subscribe(
        (data) => {
          
          this.room_types = data.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          // console.log("room_types`",data); // Add a log statement to see if data is received
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
      this.apiService.get('room_types/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "room_types":dataSingle.room_type.id,
              "adults":dataSingle.adults,
              "children":dataSingle.children,
              "infants":dataSingle.infants,
              "double_beds":dataSingle.double_beds,
              "single_beds":dataSingle.single_beds,
              "cots":dataSingle.cots,
              "twin_beds":dataSingle.twin_beds,
              "extra_beds":dataSingle.extra_beds,
              "king_beds":dataSingle.king_beds,
              "queen_beds":dataSingle.queen_beds,
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

     this.breadCrumbItems = [{ label: 'Room Types' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'Room Types' }, { label: 'Add', active: true }];
    }
  }

  onSubmit() {
    // console.log(this.parentForm,'testing here')
    
    this.submitted = true; 
    if (this.parentForm.valid) {
      // Handle form submission here
      let payload = this.parentForm.value;
      payload.id = this._id;
      this.apiService.postData('room_types',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/room-types']);
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
