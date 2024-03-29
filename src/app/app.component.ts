import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{

  shouldDisplay: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  checkRoute(url: string) {
    // Aggiungi altre condizioni se necessario
    if (url === '/fruitSlot' || url === '/premiumSlot' || url === '/mineSlot' || url === '/roulette' || url === '/horseRace' || url==='/guessTheCard' || url === '/blackjack' || url === '/profile') {
      this.shouldDisplay = false;
    } else {
      this.shouldDisplay = true;
    }
  }

}
