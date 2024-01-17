import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.scss'
})
export class RouletteComponent implements OnInit{
  constructor(private authService: AuthenticationService){
  }
  ngOnInit() {
    const token = this.authService.getTokenValue();
    if (token){ //posso ometterlo in quanto se arriva qua è gia loggato quindi ha il token??
      const rouletteUrl = `http://localhost:8080/roulette/javasWheel.html?token=${token}`;
      // Ritarda la navigazione di due secondi
      setTimeout(() => {
        window.location.href = rouletteUrl;
      }, 300);
      //window.location.href = rouletteUrl;
    }else {
      console.error('Impossibile ottenere il token utente.');
    }
  }

}
