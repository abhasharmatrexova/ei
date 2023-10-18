import { Component } from '@angular/core';
import { Router, NavigationEnd , ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api.service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-budibase-iframe',
  templateUrl: './budibase-iframe.component.html',
  styleUrls: ['./budibase-iframe.component.scss']
})
export class BudibaseIframeComponent {
  iframeUrl = process.env['BUDIBASE'];
  routePath!: string;
  safeUrl: SafeResourceUrl = '';

  constructor(private router: Router, private sanitizer: DomSanitizer, private apiService:ApiService,private readonly keycloak: KeycloakService) {}
  ngOnInit(){
      this.routePath = this.router.url;
      let userId = localStorage.getItem('userId');

      const unsafeUrl = `${this.iframeUrl}#${this.routePath}?userId=${userId}`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      console.log("budibaseurl",this.safeUrl);

  }


}
