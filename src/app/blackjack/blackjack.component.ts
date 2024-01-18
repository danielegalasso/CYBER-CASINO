import { Component } from '@angular/core';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.scss'
})
export class BlackjackComponent {
  constructor(private authService: AuthenticationService){
  }
  ngOnInit() {
    const token = this.authService.getTokenValue();
    if (token){
      const blackjackUrl = `http://localhost:8080/blackjack/blackjack.html?token=${token}`;
      window.location.href = blackjackUrl;
    }else {
      console.error('Impossibile ottenere il token utente.');
    }
  }
}
