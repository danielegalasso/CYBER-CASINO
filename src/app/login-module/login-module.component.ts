import { Component } from '@angular/core';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrl: './login-module.component.scss'
})
export class LoginModuleComponent {
contactAdmin() {
  alert('Contacting Admin');
}
  

}
