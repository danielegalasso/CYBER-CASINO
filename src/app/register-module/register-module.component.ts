import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../model/services/authentication.service';
import { BackendConstants } from '../model/backendConstants';
import { getErrorMessage } from '../model/ServerErrors';

@Component({
  selector: 'app-register-module',
  templateUrl: './register-module.component.html',
  styleUrl: './register-module.component.scss'
})
export class RegisterModuleComponent implements OnInit {

  constructor( private authService: AuthenticationService) { }

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  working: boolean = false;

  ngOnInit() {
    this.working = false;
  }

  Register() {
    if (this.working)
      return;
    this.working = true;

    if (!this.checkFields()) { //il controllo delle password deve essere fatto anche nel backend
      this.working = false;
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(response => {
      if (response) {
          alert("Registration successful!");
          this.authService.login(this.username, this.password);
          this.cleanFields();
      }
      else {
          alert("Registration failed!\nUsername or email already in use!");
          this.working = false;
      }
    },
    error => {
      alert(getErrorMessage(error.error.message));
      this.working = false;
    });
  }

  private cleanFields() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  private checkFields(): boolean {
    if (this.username.length < BackendConstants.MIN_USERNAME_LENGTH || this.username.length > BackendConstants.MAX_USERNAME_LENGTH) {
      alert(`Username must be between ${BackendConstants.MIN_USERNAME_LENGTH} and ${BackendConstants.MAX_USERNAME_LENGTH} characters`);
      return false;
    }

    if (this.password.length < BackendConstants.MIN_PASSWORD_LENGTH || this.password.length > BackendConstants.MAX_PASSWORD_LENGTH) {
      alert(`Password must be between ${BackendConstants.MIN_PASSWORD_LENGTH} and ${BackendConstants.MAX_PASSWORD_LENGTH} characters`);
      return false;
    }

    if (this.password != this.confirmPassword) {
      alert("Passwords don't match");
      return false;
    }

    if (!this.email.match(BackendConstants.EMAIL_REGEX)) {
      alert("Invalid email");
      return false;
    }

    return true;
  }
}
