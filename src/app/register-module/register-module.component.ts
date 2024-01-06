import { Component } from '@angular/core';
import { AuthenticationService } from '../model/services/authentication.service';

@Component({
  selector: 'app-register-module',
  templateUrl: './register-module.component.html',
  styleUrl: './register-module.component.scss'
})
export class RegisterModuleComponent {

  constructor( private authService: AuthenticationService) { }

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  Register() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    if (this.password != this.confirmPassword) { //il controllo delle password deve essere fatto anche nel backend
      alert('The passwords do not match!');
      return;
    }

    this.authService.register(this.username, this.email, this.password);

    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
