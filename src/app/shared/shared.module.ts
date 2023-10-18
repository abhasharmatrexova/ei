import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPaginationModule } from 'ngx-pagination'; // Add this import

//******Shared***********/
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CountryComponent } from './country/country.component';
import { SelectComponent } from './select/select.component';//added by avi
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { MultipleSelectInputComponent } from './multiple-select-input/multiple-select-input.component';
import { AddMoreComponent } from './add-more/add-more.component';
import { PickerComponent } from './picker/picker.component';
import { ButtonComponent } from './button/button.component';
import { BoxiconComponent } from './boxicon/boxicon.component';


import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Ng Search
import { NgPipesModule } from 'ngx-pipes';

// Sorting page
import { DatatableComponent } from './datatable/datatable.component';
import { MessagesComponent } from './messages/messages.component';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { FilterPipe } from './datatable/filter.pipe';
import { BudibaseIframeComponent } from './budibase-iframe/budibase-iframe.component';
import { FieldsComponent } from './fields/fields.component';
import { SwitchsComponent } from './switch/switch.component';
import { CheckboxsComponent } from './checkbox/checkbox.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { PlaceAutocompleteComponent } from './place-autocomplete/place-autocomplete.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { StreetViewComponent } from './street-view/street-view.component';
import { MapComponent } from './map/map.component';


//******Shared***********/

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    CountryComponent,
    SelectComponent,
    CkeditorComponent,
    MultipleSelectInputComponent,
    AddMoreComponent,
    PickerComponent,
    ButtonComponent,
    DatatableComponent,
    MessagesComponent,
    PopupModalComponent,
    FilterPipe,
    BudibaseIframeComponent,
    FieldsComponent,
    SwitchsComponent,
    CheckboxsComponent,
    TextAreaComponent,
    PlaceAutocompleteComponent,
    BoxiconComponent,
    StreetViewComponent,
    MapComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule,
    TimepickerModule,
    CKEditorModule,
    ModalModule,
    PaginationModule,
    BsDropdownModule,
    NgPipesModule,
    NgxPaginationModule,
    GoogleMapsModule,
    AutocompleteLibModule,
    TooltipModule,
    RouterModule

  ],
  exports: [
    BreadcrumbsComponent, // Export the component
    CountryComponent,
    SelectComponent,
    PickerComponent,
    CkeditorComponent,
    MultipleSelectInputComponent,
    AddMoreComponent,
    ButtonComponent,
    DatatableComponent,
    PopupModalComponent,
    MessagesComponent,
    FieldsComponent,
    SwitchsComponent,
    CheckboxsComponent,
    TextAreaComponent,
    PlaceAutocompleteComponent,
    BoxiconComponent,
    StreetViewComponent,
    MapComponent,
    NgSelectModule
  ],
})
export class SharedModule { }
