import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor() {}
    location :any;
    map: any;
    address:any;
    panorama: any; // Variable to store the Street View panorama


    // locationA: any = {};
    // locationB: any = {};
    locationA: any ={ latitude: 28.402854, longitude: 77.3033385 };
    locationB: any =   { latitude: 25.5940947, longitude: 85.1375645 };
    distance: string = '';




    ngOnInit(): void {
       this.getLocationAndInitMap();
    }

 
  
    getLocationAndInitMap(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = position.coords;
          this.reverseGeocode();
          this.initMap();
          // this.calculateDistance();
          this.initTwoMap('locationAMap', this.locationA.latitude, this.locationA.longitude, 'Location A');
          this.initTwoMap('locationBMap', this.locationB.latitude, this.locationB.longitude, 'Location B');
        
        });
      } else {
        // Handle geolocation not available
      }
    }
    


    initTwoMap(mapId: string, latitude: number, longitude: number,locationName: string): void {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      };
  
      const mapElement1 = document.getElementById(mapId);
      if(mapElement1){
        this.map = new google.maps.Map(mapElement1, mapOptions);
        console.log("mapElement1",mapElement1);
 
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map:this.map,
        title: locationName 
      });

      
        // Create an info window for the marker
        const infowindow = new google.maps.InfoWindow({
          content: locationName
        });

        // Add a listener for marker mouseover to show the info window
        marker.addListener('mouseover', () => {
          infowindow.open(this.map, marker);
        });
     }
   }


    
    // calculateDistance(): void {
    //   if (this.locationA.latitude && this.locationA.longitude &&
    //       this.locationB.latitude && this.locationB.longitude) {
    //     const pointA = new google.maps.LatLng(this.locationA.latitude, this.locationA.longitude);
    //     const pointB = new google.maps.LatLng(this.locationB.latitude, this.locationB.longitude);
  
    //     this.distance = google.maps.geometry.spherical.computeDistanceBetween(pointA, pointB).toFixed(2) + " meters";
    //     console.log("this.distance",this.distance);
    //   }
    // }
  
    reverseGeocode(): void {
      if (this.location) {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat: this.location.latitude, lng: this.location.longitude };

        geocoder.geocode({ location: latlng }, (results: any, status: any) => {
          console.log("latlng",results,status,results.length);
          if (status === 'OK' && results[0]) {
            this.address = results[0].formatted_address;
          }
        });
      }
    }


  
    initMap(): void {
      const mapOptions = {
        center: { lat: this.location.latitude, lng: this.location.longitude },
        zoom: 10,
      };
  
      const mapElement = document.getElementById('map');
      if (mapElement && this.location) {
        this.map = new google.maps.Map(mapElement, mapOptions);
  
        const marker = new google.maps.Marker({
          position: { lat: this.location.latitude, lng: this.location.longitude },
          map: this.map,
          title: this.address || 'Your Location'
        });
      }

      
    const streetViewElement = document.getElementById('street-view');
    if (streetViewElement) {
      this.panorama = new google.maps.StreetViewPanorama(
        streetViewElement,
        {
          position: { lat: this.location.latitude, lng: this.location.longitude },
          
          pov: { heading: 165, pitch: 0 }, // Set the initial orientation
          zoom: 1 // Set the zoom level
        }
      );

      if (this.map) {
        this.map.setStreetView(this.panorama);
      }
    }
    

    }

 

}
