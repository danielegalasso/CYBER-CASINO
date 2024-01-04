import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

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

    this.authService.register(this.username, this.email, this.password, this.confirmPassword);

    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';

    //se ci sono problemi alza eccezioni prima
    //this.router.navigate([RouteConstants.home]);

    alert('The registration was successful! You can now log in.');
    
  }

}
