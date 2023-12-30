import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
