import { Component ,Inject, Renderer2,Output,Input, EventEmitter} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
declare var google: any; 
@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})
export class PlaceAutocompleteComponent  {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Input() parentForm!: FormGroup;
  @Input() submit:any;
  @Input() controlName!: string; // Define an input property to receive the control name
  @Input() type!: string; 
  @Input() placeholder:string ='';
  @Input() id:string ='auto-input';

  googleMapsApiKey = process.env['GOOGLE_MAP_KEY'];
  predictions: google.maps.places.AutocompletePrediction[] = [];
  predictionsData :any;
  myControl = new FormControl('');
  options: any;
  searchQuery: string = ''; // Declare the searchQuery property as a string
  keyword = 'name'; 

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 24,
      lng: 12
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

onInput(event: any): void {
  console.log('API Key:', this.googleMapsApiKey);
  const query = event.target.value;
  if (query) {
    console.log(query,'query avi');
  //   this.loadGoogleMapsScript(() => {
  //   const autocompleteService = new google.maps.places.AutocompleteService();
  //   autocompleteService.getPlacePredictions({ input: query }, (predictions: any[], status: any) => {
  //     if (status === google.maps.places.PlacesServiceStatus.OK) {
  //       this.options = predictions?.map(res => res.description);
  //       console.log(" this.options ", this.options );
  //     } else {
  //       console.error('Error fetching predictions:', status);
  //     }
  //   });
  // });

  } else {
    this.options = [];
  }

}

private loadGoogleMapsScript(callback: () => void): void {
  // const script = this.renderer2.createElement('script');
  // script.type = 'text/javascript';
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places`;

  // this.renderer2.appendChild(document.body, script);
  // script.onload = callback;
}

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

private initMap(): void {
  // console.log(this.id,'this id')
  let input = document.getElementById(this.id);
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
          // let lat = location.lat();
          // let lng = location.lng();
          // let name = place.name;
          // console.log(place,'place',location,lat,lng,name)
          // If the place has a geometry, then present it on a map.
          this.setAddress.emit(res);
          });
  }
 
  }
  onValueChanged(){

  }

}
