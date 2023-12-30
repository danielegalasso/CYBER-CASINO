import { Component , HostListener} from '@angular/core';

@Component({
  selector: 'app-slot-ernesto',
  templateUrl: './slot-ernesto.component.html',
  styleUrl: './slot-ernesto.component.scss'
})
export class SlotErnestoComponent {

  @HostListener('window:keydown.Space', ['$event'])
  listenSpace(e: KeyboardEvent): void {
      this.spinAction();
  }

  spinAction(event?: KeyboardEvent) {
    if (!event || event.key === ' ' || event.key === 'Spacebar') {
      // Aggiungi qui la logica che vuoi eseguire quando si preme lo spazio
      if (this.balance > this.bet){
      this.balance -= this.bet;
      console.log('Space pressed or button clicked');
      }

    }
  }

  balance: number = 300;
  bet: number = 1;

  addToBet() {
    // Incrementa il valore della scommessa
    if (this.bet < 10000) {
      this.bet += 1;
    }
  }

  deleteFromBet() {
    // Decrementa il valore della scommessa solo se è maggiore di zero
    if (this.bet > 1) {
      this.bet -= 1;
    }

  }


}
