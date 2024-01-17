import { Component , OnInit, DoCheck} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../model/services/authentication.service';
import { RouteConstants } from '../model/routeConstants';

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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ottieni la parte finale dell'URL dopo l'ultima barra
        const urlParts = event.url.split('/');
        const lastPart = urlParts[urlParts.length - 1];

        // Aggiorna selectedNavItem in base all'URL
        switch (lastPart) {
          case '':
            this.selectedNavItem = 'Games';
            break;
          case 'dailySpin':
            this.selectedNavItem = 'Bonus';
            break;
          case 'faq':
            this.selectedNavItem = 'FAQ';
            break;
          default:
            this.selectedNavItem = '';
            break;

          // Aggiungi altri casi se necessario
        }
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

balanceValue: number = 100;
}
