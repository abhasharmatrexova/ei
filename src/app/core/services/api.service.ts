import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  backendUrl = process.env['MASTER_COURIER'];
  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  keycloakId:any;
  loginUserId:any;

  constructor(private keycloak: KeycloakService,private httpclient: HttpClient) { }


  ngOnInit(){
  }

  getUserRoles(): string[] {
    const tokenContent = this.keycloak.getKeycloakInstance().tokenParsed;

    if (tokenContent && tokenContent.realm_access) {
      return tokenContent.realm_access.roles;
    }
    return [];
  }

  //******** Get Side Menu */
   sideMenuData(): Observable<any> {
    return this.httpclient.get( this.backendUrl + "user-pages");
  }

    //******** Get Side Menu */
    UserData(): Observable<any> {
      return this.httpclient.get( this.backendUrl + "testing-user");
    }

    getStatus(): Observable<any> {
      return this.httpclient.get( this.backendUrl + "status");
    }

  //******** Get Country data */
    getCountry(): Observable<any> {
      return this.httpclient.get(this.backendUrl + "get-country-list");
    }
    getCityListByCountryCode(): Observable<any> {
      const requestData = {
        "selected_country_id": localStorage.getItem('country_id') //1:IND
      }
      return this.httpclient.post(this.backendUrl+'get-city-list-by-country-code', requestData);
    }

    getrole(): Observable<any> {
      return this.httpclient.get(this.backendUrl+'role');
    }

    saveLastScreenUrl( url: string): Observable<any> {
      const data = { url };
      return this.httpclient.post(this.backendUrl+'save-last-screen-url', data);
    }


    getLoginUser(): Observable<any> {
    const requestData = {
          "user_id": localStorage.getItem('keycloakId') //'9fbffb05-ea19-4e0f-b114-dc712955f1f8'
      }
      return this.httpclient.post(this.backendUrl+'get-staff-list', requestData);
    }


    setData(data: any) {
      this._data.next(data);
    }

    init(url:string): Observable<any> {
      return this.httpclient.get(this.backendUrl+url);
    }
    get(url:string): Observable<any> {
      return this.httpclient.get(this.backendUrl+url);
    }
    postData(url:string,payload:{}): Observable<any> {
      return this.httpclient.post(this.backendUrl+url,payload);
    }




}
