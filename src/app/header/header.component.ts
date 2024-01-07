import { Component , OnInit, DoCheck} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../model/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private router: Router, private authService: AuthenticationService) {
    
  }
  
  ngOnInit() {
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

    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();

    this.printIsLoggedIn();
  }

  ngDoCheck() {
    // Monitora i cambiamenti nella funzione isAuthenticated e aggiorna isLoggedIn
    const isAuthenticated = this.authService.isAuthenticated();
    if (this.isLoggedIn !== isAuthenticated) {
      this.isLoggedIn = isAuthenticated;
      this.isAdmin = this.authService.isAdmin();
      if (this.isLoggedIn) {
        this.router.navigate(['/']);
        this.selectedNavItem = 'Games';
      }
    }
  }

  selectedNavItem: string = 'Games'; // Inizializza con il valore predefinito

  selectNavItem(navItem: string): void {
    this.selectedNavItem = navItem;
  }


  isLoggedIn = false;
  isAdmin = false;

  signOut() {
    // Imposta isLoggedIn su false quando il pulsante viene cliccato
    this.authService.logout();
    this.isLoggedIn = false;
  }

  onFormSubmit(event: Event) {
    // Previeni l'azione predefinita del form
    event.preventDefault();
  }

  
  
// Funzione per stampare il valore di isLoggedIn nella console ogni 2 secondi (DEBUGGING ONLY)
printIsLoggedIn(): void {
  setInterval(() => {
    console.log(this.authService.isAuthenticated());
  }, 2000);
}

}
