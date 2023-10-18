import { Component ,OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  title = 'ei_canvas';
  public isLogueado = false;
  public perfilUsuario: KeycloakProfile | null = null;
 
  constructor(private readonly keycloak: KeycloakService, private router: Router ,private apiService : ApiService) {}

  public async ngOnInit() {

    this.isLogueado = await this.keycloak.isLoggedIn();
    // console.log("this.isLogin ",this.isLogueado );
    if (this.isLogueado ) {
      this.router.navigate(['/dashboard']);

      // console.log("response");
      // this.apiService.getLoginUser().subscribe( (response) => {
      //     this.router.navigate([response['data'][0]['url']]);
      // },
      // (error) => {
      //   console.error('Error saving URL in the database:', error);
      // }

      // )
    }
      // if (this.isLogueado) {
      //   this.perfilUsuario = await this.keycloak.loadUserProfile();
      // }
    
    }
   

 

  public iniciarSesion() {
    this.keycloak.login();
  }

  public cerrarSesion() {
    this.keycloak.logout();
  }
}