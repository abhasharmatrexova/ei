import { Component, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SharedDataService } from '../../shared/shared-data.service';
import { ApiService } from 'src/app/core/services/api.service';


import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {



  //**************/
  // private roleSubject = new BehaviorSubject<string>(localStorage.getItem('role') || 'user');
  // role$: Observable<string> = this.roleSubject.asObservable();
  
  localStorageRole: string = localStorage.getItem('role') || 'user';

  public userProfile: KeycloakProfile | null = null;

  //*************/

  country: any;
  selectedItem!: any;
  routePath:any;
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  cartData: any;

  element: any;
  mode: string | undefined;

  total: any;
  subtotal: any = 0;
  totalsum: any;
  taxRate: any = 0.125;
  shippingRate: any = '65.00';
  discountRate: any = 0.15;
  discount: any;
  tax: any;

  @Output() mobileMenuButtonClicked = new EventEmitter();
  @ViewChild('removeNotificationModal', { static: false }) removeNotificationModal?: ModalDirective;
  @ViewChild('removeCartModal', { static: false }) removeCartModal?: ModalDirective;
  deleteid: any;
  getUserRoles:any;
  public isLogueado = false;

  username:any;
  rolesData: any;
  constructor(@Inject(DOCUMENT) private document: any,
    private readonly keycloak: KeycloakService,
    public languageService: LanguageService,
    private sharedDataService: SharedDataService,
    private apiService: ApiService,
    private router: Router,
    public _cookiesService: CookieService) { }
  
  async ngOnInit(): Promise<void> {
    this.getLoginUserData();  

    const tokenContent = this.keycloak.getKeycloakInstance().tokenParsed;

    if (tokenContent && tokenContent.realm_access) {
      const roles: string[] = tokenContent.realm_access.roles;
      const rolesToExclude = ['offline_access', 'uma_authorization','default-roles-test1'];
      const filteredRoles = roles.filter(role => !rolesToExclude.includes(role));
      // this.filteredRoles = this.filterdata.split(',');
      this.rolesData = filteredRoles;
    }


    

    
    
    // this.cartData = cartList
    // this.cartData.map((x: any) => {
    //   x['total'] = (x['qty'] * x['price']).toFixed(2)
    //   this.subtotal += parseFloat(x['total'])
    // })
    this.subtotal = 2;//this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  

    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
      this.countryName = 'English'
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }



  // private getUserRoles() {
  //   const tokenContent = this.keycloak.getKeycloakInstance().tokenParsed;

  //   if (tokenContent && tokenContent.realm_access) {
  //     const roles: string[] = tokenContent.realm_access.roles;
  //     console.log('User Roles:',  tokenContent.realm_access);
  //   }
  // }
 

  //*************/
   // Author : AS
   // Method : switchToSalesUser
   // Description :

  switchToSalesUser(role: string) {
    localStorage.setItem('role', role);
    this.localStorageRole = role; 
    // this.sharedDataService.setHeaderValue(this.localStorageRole);  //call function with value
    this.sharedDataService.triggerHeaderFunction();  //call function without value
  }
   //*****************/


  //*************/
   // Author : AS
   // Method : getLoginUserData
   // Description :

   private async getLoginUserData() {
    if (await this.keycloak.isLoggedIn()) {
      this.userProfile = await this.keycloak.loadUserProfile();
      // console.log(" this.userProfile", this.keycloak.getKeycloakInstance().token);
    }
  }

  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  //*****************/

  windowScroll() {
    // if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //   (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
    //   document.getElementById('page-topbar')?.classList.add('topbar-shadow')
    // } else {
    //   (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
    //   document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
    // }
  }

  // Increment Decrement Quantity
  qty: number = 0;
  increment(qty: any, i: any, id: any) {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }

    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total'])
    })

    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  }

  removeCart(id: any) {
    this.removeCartModal?.show()
    this.deleteid = id;
  }

  confirmDelete() {
    this.removeCartModal?.hide()
    
    this.subtotal -= this.cartData[this.deleteid].total
    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalsum = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
    this.cartData.splice(this.deleteid, 1)
  }

   /**
 * Topbar Light-Dark Mode Change
 */
   changeMode(mode: string) {
    this.mode = mode;
    document.documentElement.setAttribute('data-bs-theme', mode)
    document.documentElement.setAttribute('data-sidebar', mode);
    document.documentElement.setAttribute('data-topbar', mode);

   }
  
  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'sp' },
    { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'gr' },
    { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
    { text: 'Arabic', flag: 'assets/images/flags/ae.svg', lang: 'ar' },
  ];

   /***
   * Language Value Set
   */
   setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open')
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

   /**
   * Fullscreen method
   */
   fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  // Search Topbar
  Search() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;
    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = ''
        if (element.querySelector("h6")) {
          var spantext = element.getElementsByTagName("span")[0].innerText.toLowerCase()
          var name = element.querySelector("h6").innerText.toLowerCase()
          if (name.includes(inputVal)) {
            notifiTxt = name
          } else {
            notifiTxt = spantext
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element.getElementsByTagName("span")[0].innerText.toLowerCase()
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal) ? "block" : "none";

      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown.classList.remove("show");
    searchOptions.classList.add("d-none");
    searchInputReponsive.value = "";
  }

  /**
   * Logout the user
   */

  logout() {
    const currentUrl = this.router.url;
    console.log("currentUrl",currentUrl);
    this.apiService.saveLastScreenUrl(currentUrl).subscribe(
      (response) => {
        console.log("response",response);
        this.keycloak.logout();
        console.log('URL saved in the database:', currentUrl,response);
      },
      (error) => {
        console.error('Error saving URL in the database:', error);
      }
    );
    this.router.navigate(['/login']);
  }
  
}
