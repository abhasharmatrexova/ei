import { Component } from '@angular/core';
// Ck Editer
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor, TOOLBAR_FULL } from 'ngx-editor';
@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss']
})
export class CkeditorComponent {
  editor: any = Editor;
  public Editor = ClassicEditor;
  
  ngOnInit(): void {
    this.editor = new Editor();
  }
}
