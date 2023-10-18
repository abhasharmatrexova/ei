import { Component,Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent  {
  @Input() type: string | undefined;

  //****** For delete popup datatable 
  //*******/

  @Input() deleteId!:number;
  @ViewChild('deleteModal', { static: false }) deleteModal?: ModalDirective;

  @ViewChild('showModal') showModal?:ModalDirective;
  //*******/
  name: any;
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  // constructor(private modalService: BsModalService) { }


  // varyingModal(template: TemplateRef<any>, name: any) {
  //   this.name = name
  //   this.modalRef = this.modalService.show(template, this.config);
  // }
}
