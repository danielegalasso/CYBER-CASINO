import { Component } from '@angular/core';

@Component({
  selector: 'app-games-grid',
  templateUrl: './games-grid.component.html',
  styleUrl: './games-grid.component.scss'
})
export class GamesGridComponent {



  allImages = [
    '../../assets/GamesCopertine/Screenshot 2023-12-26 175834 - Copia.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184223.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184258.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184321.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184442.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184724.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184929.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 185147.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 185211.png'
  ];

  sloths = [
    '../../assets/GamesCopertine/Screenshot 2023-12-26 175834 - Copia.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184442.png',
    '../../assets/GamesCopertine/Screenshot 2023-12-26 185054.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png'


  ];

  roulette = [
    '../../assets/GamesCopertine/Screenshot 2023-12-26 184223.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png',
    '../../assets/GamesCopertine/empty.png'
  ];

  immagini = this.allImages;


  selectedTab: string = 'ALL';

  selectTab(tab: string): void {
    this.selectedTab = tab;

    if (tab == 'ALL'){
      this.immagini = this.allImages;
    } else if (tab == 'SLOTS'){
      this.immagini = this.sloths;
    } else if (tab == 'ROULETTE'){
      this.immagini = this.roulette;
    }

    
  }

}
