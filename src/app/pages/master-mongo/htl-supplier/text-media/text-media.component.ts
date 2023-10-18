

import { Component,EventEmitter,Input, Output } from '@angular/core';
import {ApiService} from '../../../../core/services/api.service'
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-text-media',
  templateUrl: './text-media.component.html',
  styleUrls: ['./text-media.component.scss']
})
export class TextMediaComponent {
  productForm: FormGroup;  
  // mediaFiles: any;
     
  constructor(private fb:FormBuilder,private apiService:ApiService) {  
     
    this.productForm = this.fb.group({   
      textMedia: this.fb.array([]) ,  
    });  
  }  

  ngOnInit(): void {
    this.add();    
  }

  imageURL: any;
  mediaFiles: string[] = [];
  
  onFileChange(event: any, index: number) {
    if (event.target.files && event.target.files[0]) {
      const attachments = this.productForm.get('textMedia') as FormArray;
      const fileControl = attachments.at(index).get('supplier_media') as FormControl;
  console.log("attachments",attachments,fileControl);
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


  // onFileChange(event: any, index: number) {
  //   event.addedFiles.forEach((file: File) => {
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       const imageURL = reader.result as string;
  //       this.mediaFiles.push(imageURL);
  //       console.log("Image URLs:", this.mediaFiles);
  //     };
  
  //     reader.readAsDataURL(file);
  //   });
  // }
 
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  files: File[] = [];
    
  textMedia() : FormArray {  
    return this.productForm.get("textMedia") as FormArray  
  }  
     
  newtextMedia(): FormGroup {  
    return this.fb.group({  
      itinerary_text: '', 
      supplier_media:'',
    })  
  }  
     
  add() {  
    this.textMedia().push(this.newtextMedia());  
  }  
     
  remove(i:number) {  
    this.textMedia().removeAt(i);  
  } 
}
