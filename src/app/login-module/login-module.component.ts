import { Component } from '@angular/core';
import { AuthenticationService } from '../model/services/authentication.service';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrl: './login-module.component.scss'
})
export class LoginModuleComponent {
  
  constructor( private authService: AuthenticationService) { }

  logIn() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.authService.login(this.username, this.password);
  }

  username: string = '';
  password: string = '';


  //seve solo per il debugging
  printIsLoggedIn(): void {
    setInterval(() => {
      console.log('loginModule'+this.authService.isAuthenticated());
    }, 2000);
  }


  

}
