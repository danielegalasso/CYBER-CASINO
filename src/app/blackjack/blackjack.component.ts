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
    if (token){ //posso ometterlo in quanto se arriva qua è gia loggato quindi ha il token??
      const rouletteUrl = `http://localhost:8080/blackjack/blackjack.html?token=${token}`;
      window.location.href = rouletteUrl;
      //window.location.href="http://localhost:8080/roulette/javasWheel.html";
    }else {
      console.error('Impossibile ottenere il token utente.');
    }
  }
}
