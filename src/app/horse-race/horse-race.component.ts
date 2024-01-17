import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
  selector: 'app-horse-race',
  templateUrl: './horse-race.component.html',
  styleUrl: './horse-race.component.scss'
})
export class HorseRaceComponent implements OnInit {
  constructor(private authService: AuthenticationService){
  }
  ngOnInit() {
    const token = this.authService.getTokenValue();
    if (token) { //posso ometterlo in quanto se arriva qua è gia loggato quindi ha il token??
      const horseRaceUrl = `http://localhost:8080/horseRacing/index.html?token=${token}`;
      setTimeout(() => {
        window.location.href = horseRaceUrl;
      }, 300);
      //window.location.href = horseRaceUrl;
      //window.location.href="http://localhost:8080/horseRacing/index.html";

    }else {
      console.error('Impossibile ottenere il token utente.');
    }

  }
}
