import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.scss']
})
export class StreetViewComponent implements OnInit {
  @ViewChild('streetView', { static: true }) streetViewRef!: ElementRef;

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.initStreetView(lat, lng);
      });
    }
  }

  initStreetView(lat: number, lng: number) {
    const panorama = new google.maps.StreetViewPanorama(this.streetViewRef.nativeElement, {
      position: { lat: lat, lng: lng },
      pov: { heading: 0, pitch: 0 },
      zoom: 1
    });
  }
}
