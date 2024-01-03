import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthenticationService) {
    // Aggiungi un ascoltatore per gli eventi di navigazione
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Controlla l'URL e imposta selectedNavItem in base alla condizione
      if (event.url === '/bonus' && this.selectedNavItem !== 'Bonus') {
        this.selectedNavItem = 'Bonus';
      }
      if (event.url === '/faq' && this.selectedNavItem !== 'FAQ') {
        this.selectedNavItem = 'FAQ';
      }
      if (event.url === '/admin' || event.url === '/login' || event.url === '/register') {
        this.selectedNavItem = '';
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

  onFormSubmit(event: Event) {
    // Previeni l'azione predefinita del form
    event.preventDefault();
  }

}
