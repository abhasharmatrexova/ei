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
  cousine_types:any;
  main_courses:any; 
  meal_types:any; 
  submitted = false; // Add this flag
  breadCrumbItems!: Array<{}>;
  selectedRSTType = 'Select Country';
  parentForm: FormGroup;
  menuItemForm: FormGroup | undefined;
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
      this.menuItemForm = this.formBuilder.group({
        name: new FormControl('', []),
      });
      //Validations
      this.parentForm = this.formBuilder.group({
        // Define form controls and their initial values and validators here
        code: ['', ''],
        name: ['', ''],
        cousine_type: ['', ''],
        main_course: ['', ''],
        meal_type: ['', ''],
        menu_validity: ['', ''],
        menu_details: this.formBuilder.array([])
        
      });
    }

    init() {
      
      // console.log(this._activatedroute.snapshot.params['id'],'routeer')
      this.apiService.init('rst-type/init').subscribe(
        (data) => {
         
          this.cousine_types = data.cousine_types.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.main_courses = data.main_courses.map(function(item:any){
            item.text = item.fullName;
            return item;
          });
          this.meal_types = data.meal_types.map(function(item:any){
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
    onValueChanged() {
      console.log("test");
    }
    getById(id:string){
      this.apiService.get('rst-type/'+id).subscribe(
        (data) => {
          if(data.length == 1){
            let dataSingle = data[0];
            
            this.parentForm.patchValue({
              "code":dataSingle.code,
              "name":dataSingle.name,
              "cousine_type":dataSingle.cousine_type.id,
              "main_course":dataSingle.main_course.id,
              "meal_type":dataSingle.meal_type.id,
              // "menu_validity":dataSingle.menu_validity,
              //"menu_details":dataSingle.menu_details
            })

            if(dataSingle.menu_details.length >0){
              dataSingle.menu_details.map((item:any) =>{
                this.addNewItem(item.item);
              })
            }
            if(dataSingle.menu_validity){
              const menu_validity = [new Date(dataSingle.menu_validity.start_date),new Date(dataSingle.menu_validity.end_date)];
              console.log(menu_validity,'menu alidat')
              this.parentForm.patchValue({
                "menu_validity":menu_validity
              })
            }
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

     this.breadCrumbItems = [{ label: 'RST Services' }, { label: 'Update', active: true }];
     this.getById(this._id);
    } else {
     this.breadCrumbItems = [{ label: 'RST Services' }, { label: 'Add', active: true }];
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
      this.apiService.postData('rst-type',payload).subscribe(
        (data) => {
          this.submitted = false;
          this.toastService.success('Record saved.', 'Success', {
            timeOut: 9000,
            enableHtml: true
          }); // Add a log statement to see if data is received

          this._router.navigate(['/rst-services']);
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
  
  get menu_details() {
    return this.parentForm.controls["menu_details"] as FormArray;
  }
  addNewItem(vl:string=''){
    const menu_details = this.parentForm.controls["menu_details"] as FormArray;
    const newItem = new FormGroup({
      'item': new FormControl(vl, [])
    })
    menu_details.push(newItem)
  }
  removeNewItem(i:number){
    const menu_details = this.parentForm.controls["menu_details"] as FormArray
    if (menu_details.length > 1) {
      menu_details.removeAt(i)
    } else {
      menu_details.reset()
    }
    // this.menu_details.removeAt(index);
  }

  

}
