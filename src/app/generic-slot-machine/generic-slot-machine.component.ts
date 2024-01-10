import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SlotMachine, SlotMachineBuilder } from '../model/Games/SlotMachine/slotMachine';
import { SlotMachineComponent } from '../slot-machine/slot-machine.component';
import { GameInformation } from '../model/Games/GameInformation';
import { AuthenticationService } from '../model/services/authentication.service';
import { GamesService } from '../model/services/games.service';
import { GameType } from '../model/Games/GameType';
import { SlotMachineType } from '../model/Games/SlotMachine/SlotMachineType';
import { error } from 'jquery';
import { getErrorMessage } from '../model/ServerErrors';

@Component({
  selector: 'app-generic-slot-machine',
  templateUrl: './generic-slot-machine.component.html',
  styleUrl: './generic-slot-machine.component.scss'
})

export class GenericSlotMachineComponent implements OnInit, AfterViewInit{
  @Input() slotMachine!: SlotMachine;

  playing: boolean = false;

  constructor(private authenticationService: AuthenticationService, private gamesService: GamesService) { }

  ngOnInit(): void {
    const styles = document.documentElement.style;
    styles.setProperty('--background-img', this.slotMachine.BackgroundImg);
  }

  ngAfterViewInit(): void {
    this.gamesService.getBalance().subscribe(bal => {
      console.log(bal);
      this.balance = bal;
      if (this.balance == 0)
        this.bet = 0;
    },
    error => {
      alert(getErrorMessage(error.error.message));
    });
  }

  @HostListener('window:keydown.Space', ['$event'])
  listenSpace(e: KeyboardEvent): void {
      this.spinAction();
  }

  spinAction(event?: KeyboardEvent) {
    this.callSpinFunction();
    /*if (!event || event.key === ' ' || event.key === 'Spacebar') {
      // Aggiungi qui la logica che vuoi eseguire quando si preme lo spazio
      if (this.balance > this.bet){
      this.balance -= this.bet;
      console.log('Space pressed or button clicked');
      this.callSpinFunction()
      }

    }*/
  }

  tmpBalance: number;
  balance: number = 0;
  bet: number = 1;

  addToBet() {
    if(this.slotMachineComponent.rolling.value) {
      return;
    }
    // Incrementa il valore della scommessa
    if (this.bet < this.balance) {
      this.bet += 1;
    }
  }

  deleteFromBet() {
    if(this.slotMachineComponent.rolling.value) {
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
    if (this.slotMachineComponent.rolling.value) {
      return;
    }

    if (this.bet == 0) {
      alert("You have no money to bet!");
      return;
    }

    console.log("spin function called");
    this.slotMachineComponent.rolling.next(true);

    this.slotMachineComponent.rollingObservable.subscribe((newValue) =>
      {
        if (newValue == false)
          this.balance = this.tmpBalance;
        if (this.bet > this.balance)
          this.bet = this.balance;
        if (this.balance == 0)
          this.bet = 0;
    });

    let gameinfo: GameInformation = {sessionToken: this.authenticationService.getTokenValue(), gameType: GameType.SLOT_MACHINE, bet: this.bet, betOn: null , additionalInfo: this.slotMachine.SlotType.toString()};
    this.gamesService.generateResult(gameinfo).subscribe(
      gameResult => {
        if (gameResult == null) {
          alert("Error while playing, please try again later");
          this.slotMachineComponent.rolling.next(false);
          return;
        }
        console.log(gameResult);
        console.log(gameResult.result);
        console.log(gameResult.balance);
        this.slotMachineComponent.result = gameResult.result;
        this.tmpBalance = gameResult.balance;
        this.slotMachineComponent.rollAll();
      },
      error => {
        alert(getErrorMessage(error.error.message));
        this.slotMachineComponent.rolling.next(false);
      }
    )
  }
}