import { Component, DoCheck, OnInit} from '@angular/core';
import { AuthenticationService } from '../model/services/authentication.service';

@Component({
  selector: 'app-games-grid',
  templateUrl: './games-grid.component.html',
  styleUrl: './games-grid.component.scss'
})
export class GamesGridComponent implements OnInit, DoCheck{



  constructor(private authService: AuthenticationService) { }

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

  }

  ngDoCheck() {
    // Monitora i cambiamenti nella funzione isAuthenticated e aggiorna isLoggedIn
    const isAuthenticated = this.authService.isAuthenticated();
    if (this.isLoggedIn !== isAuthenticated) {
      this.isLoggedIn = isAuthenticated;
    }
  }



  allImages = [
    { nome: 'fruitSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 175834 - Copia.png' },
    { nome: 'mineSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 184442.png' },
    { nome: 'premiumSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 185054.png' },
    { nome: 'roulette', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 184223.png' },
    { nome: 'stallionSprint', url: '../../assets/GamesCopertine/Screenshot 2024-01-07 194534.png' },
    { nome: 'blackjack', url: '../../assets/GamesCopertine/blackjackCopertina.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' }
  ];


  slots =[
    { nome: 'fruitSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 175834 - Copia.png' },
    { nome: 'mineSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 184442.png' },
    { nome: 'premiumSlot', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 185054.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' }
  ];

  roulette = [
    { nome: 'roulette', url: '../../assets/GamesCopertine/Screenshot 2023-12-26 184223.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' },
    { nome: 'Empty', url: '../../assets/GamesCopertine/empty.png' }
  ];

  immagini = this.allImages;


  selectedTab: string = 'ALL';

  selectTab(tab: string): void {
    this.selectedTab = tab;

    if (tab == 'ALL'){
      this.immagini = this.allImages;
    } else if (tab == 'SLOTS'){
      this.immagini = this.slots;
    } else if (tab == 'ROULETTE'){
      this.immagini = this.roulette;
    }


  }

}
