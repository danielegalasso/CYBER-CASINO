import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from '../model/slotMachine';
import { SlotMachineComponent } from '../slot-machine/slot-machine.component';
import { GameInformation } from '../model/GameInformation';
import { AuthenticationService } from '../service/authentication.service';
import { GamesService } from '../service/games.service';

@Component({
  selector: 'app-generic-slot-machine',
  templateUrl: './generic-slot-machine.component.html',
  styleUrl: './generic-slot-machine.component.scss'
})

export class GenericSlotMachineComponent implements OnInit{
  @Input() slotMachine!: SlotMachine;

  playing: boolean = false;

  constructor(private authenticationService: AuthenticationService, private gamesService: GamesService) { }

  ngOnInit(): void {
    const styles = document.documentElement.style;
    styles.setProperty('--background-img', this.slotMachine.BackgroundImg);
  }

  @HostListener('window:keydown.Space', ['$event'])
  listenSpace(e: KeyboardEvent): void {
      this.spinAction();
  }

  spinAction(event?: KeyboardEvent) {
    /*if (!event || event.key === ' ' || event.key === 'Spacebar') {
      // Aggiungi qui la logica che vuoi eseguire quando si preme lo spazio
      if (this.balance > this.bet){
      this.balance -= this.bet;
      console.log('Space pressed or button clicked');
      this.callSpinFunction()
      }

    }*/
  }

  balance: number = 300;
  bet: number = 1;

  addToBet() {
    if(this.slotMachineComponent.rolling) {
      return;
    }
    // Incrementa il valore della scommessa
    if (this.bet < 10000) {
      this.bet += 1;
    }
  }

  deleteFromBet() {
    if(this.slotMachineComponent.rolling) {
      return;
    }
    // Decrementa il valore della scommessa solo se è maggiore di zero
    if (this.bet > 1) {
      this.bet -= 1;
    }

  }


  @ViewChild(SlotMachineComponent) slotMachineComponent: SlotMachineComponent;


  //disable all buttons when calling this function
  callSpinFunction() {
    if (this.slotMachineComponent.rolling) {
      return;
    }
    this.slotMachineComponent.rolling = true;

    let gameinfo: GameInformation = {"sessionToken": this.authenticationService.getToken(), "gameName": this.slotMachine.SlotType, "bet": this.bet};
    this.gamesService.generateResult(gameinfo).subscribe(result => {
      this.slotMachineComponent.result = result;
      this.slotMachineComponent.rollAll();
    })
  }
}

