import { Component } from '@angular/core';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
  selector: 'app-guess-the-card',
  templateUrl: './guess-the-card.component.html',
  styleUrl: './guess-the-card.component.scss'
})
export class GuessTheCardComponent {
  constructor(private authService: AuthenticationService){
  }
  ngOnInit() {
    const token = this.authService.getTokenValue();
    if (token){
      const guessTheCardUrl = `http://localhost:8080/guessTheCard/guessTheCard.html?token=${token}`;
      window.location.href = guessTheCardUrl;
    }else {
      console.error('Impossibile ottenere il token utente.');
    }
  }
}
