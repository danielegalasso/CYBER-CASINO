import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SlotMachine } from '../model/Games/SlotMachine/slotMachine';
import { SlotMachineComponent } from '../slot-machine/slot-machine.component';
import { GameInformation } from '../model/Games/GameInformation';
import { AuthenticationService } from '../model/services/authentication.service';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { GameType } from '../model/Games/GameType';
import { getErrorMessage } from '../model/ServerErrors';
import { createAlert } from '../model/popupCreator';

@Component({
  selector: 'app-generic-slot-machine',
  templateUrl: './generic-slot-machine.component.html',
  styleUrl: './generic-slot-machine.component.scss'
})

export class GenericSlotMachineComponent implements OnInit, AfterViewInit{
  @Input() slotMachine!: SlotMachine;

  initialized: boolean = false;
  playing: boolean = false;

  tmpBalance: number;
  balance: number = 0;
  bet: number = 1;

  constructor(private authenticationService: AuthenticationService, private apiCallerService: ApiCallerService) {
    this.initialized = false;
  }

  ngOnInit(): void {
    const styles = document.documentElement.style;
    styles.setProperty('--background-img', this.slotMachine.BackgroundImg);
  }

  ngAfterViewInit(): void {
    this.apiCallerService.getBalance().subscribe(bal => {
      console.log(bal);
      this.balance = bal;
      if (this.balance == 0)
        this.bet = 0;
      this.initialized = true;
    },
    error => {
      createAlert(getErrorMessage(error.error.message));
    });
  }

  @HostListener('window:keydown.Space', ['$event'])
  listenSpace(e: KeyboardEvent): void {
      this.callSpinFunction();
  }

  addToBet() {
    if(!this.initialized || this.slotMachineComponent.rolling.value) {
      return;
    }
    // Incrementa il valore della scommessa
    if (this.bet < this.balance) {
      this.bet += 1;
    }
  }

  deleteFromBet() {
    if(!this.initialized || this.slotMachineComponent.rolling.value) {
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
    if (!this.initialized || this.slotMachineComponent.rolling.value) {
      return;
    }

    if (this.bet == 0) {
      createAlert("You have no money to bet!");
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
    this.apiCallerService.generateResult(gameinfo).subscribe(
      gameResult => {
        if (gameResult == null) {
          createAlert("Error while playing, please try again later");
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
        createAlert(getErrorMessage(error.error.message));
        this.slotMachineComponent.rolling.next(false);
      }
    )
  }
}