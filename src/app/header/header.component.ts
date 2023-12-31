import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {
    // Aggiungi un ascoltatore per gli eventi di navigazione
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Controlla l'URL e imposta selectedNavItem in base alla condizione
      if (event.url === '/bonus' && this.selectedNavItem !== 'Bonus') {
        this.selectedNavItem = 'Bonus';
      }
    });
  }

  selectedNavItem: string = 'Games'; // Inizializza con il valore predefinito

  selectNavItem(navItem: string): void {
    this.selectedNavItem = navItem;
  }

  isLoggedIn = true;
  isAdmin = true;

  signOut() {
    // Imposta isLoggedIn su false quando il pulsante viene cliccato
    this.isLoggedIn = false;
  }

}
