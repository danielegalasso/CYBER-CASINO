import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthenticationService } from '../model/services/authentication.service';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { GameInformation } from '../model/Games/GameInformation';
import { GameType } from '../model/Games/GameType';
import { DailySpinConstants } from '../model/Games/DailySpin/DailySpinConstants';
import { Router } from '@angular/router';
import { getErrorMessage } from '../model/ServerErrors';
import { createAlert } from '../model/popupCreator';

//colori usati per i differenti settori della ruota
const COLORS = ['#2b1d6b', '#4e06c2', '#7f14c7'];

@Component({
  selector: 'app-free-spin',
  templateUrl: './free-spin.component.html',
  styleUrl: './free-spin.component.scss'
})
export class FreeSpinComponent implements AfterViewInit, DoCheck {
  constructor(private authService: AuthenticationService, private apiCallerService: ApiCallerService, private router: Router) {}

  //lifecycle hook di angular. metodi speciali che vengono chiamati in determinati momenti di vita del componente.
  //ngDoCheck viene chiamato ogni volta che viene rilevato un cambiamento nel componente.
  ngDoCheck(): void {
    this.engine();  //ogni volta che il componente cambia chiama la funzione engine()
  }
  engine() {
    //informa il browser che si desidera eseguire un'animazione e richiede che il browser chiami una funzione specifica
    //per aggiornare un'animazione prima della prossima repaint.
    requestAnimationFrame(this.frame.bind(this));
  }
  ngAfterViewInit(): void {
    //creazione dei settori della ruota in base a DailySpinConstants.elements
    this.sectors = DailySpinConstants.elements.map((opts, i) => {
      return {
        color: COLORS[(i >= COLORS.length ? i + 1 : i) % COLORS.length],
        label: opts,
      };
    });
    console.log(this.sectors);
    if (this.wheel) {
      this.createWheel();
    }
  }

  @ViewChild('wheel') wheel: ElementRef<HTMLCanvasElement>;
  @ViewChild('spin') spin: ElementRef;
  @ViewChild('wheelSound') wheelSound: ElementRef<HTMLAudioElement>;
  @ViewChild('winFineSound') winFineSound: ElementRef<HTMLAudioElement>;

  currentOptionIndex: number;
  sectors: any[] = [];
  destinationIndex?: number;
  rand = (m, M) => Math.random() * (M - m) + m;
  tot;  //numero di settori della ruota. lunghezza dell'array sectors
  ctx: CanvasRenderingContext2D; //contest 2d del canvas dove disegno la ruota
  dia; //diametro della ruota
  rad; //raggio della ruota
  PI;   //pi greco
  TAU;  //2pi greco
  arc0;  //angolo di ciascun settore
  friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  //lastSelection;
  showCongratulations = false;

  createWheel() {
    // inizializzazione delle variabili per la ruota
    this.ctx = this.wheel.nativeElement.getContext('2d');
    this.dia = this.ctx.canvas.width;
    this.tot = this.sectors.length;
    this.rad = this.dia / 2;
    this.PI = Math.PI;
    this.TAU = 2 * this.PI;
    this.arc0 = this.TAU / this.sectors.length;
    //per ogni settore della ruota, disegna il settore
    this.sectors.forEach((sector, i) => this.drawSector(sector, i));
    this.rotate(true);
  }

  spinning = false;
  spinner() {
    if (!this.authService.isAuthenticated()) {
      // Se non è loggato, mostra l'alert
      this.router.navigate(['/login']);
      return;
    }
    if (this.spinning) { //se la ruota sta già girando, non fare nulla
      return;
    }
    this.spinning = true;

    // Chiamata al backend per generare il risultato, e ottenere l'indice di destinazione
    let gameinfo: GameInformation = {sessionToken: this.authService.getTokenValue(), gameType: GameType.DAILY_SPIN, bet: 0, betOn: null, additionalInfo: ""};
    this.apiCallerService.generateResult(gameinfo).subscribe(
      generatedGame => {
        console.log(generatedGame);
        let amountWon = parseInt(generatedGame.result.at(0));
        this.destinationIndex = DailySpinConstants.valueIndexMap.get(amountWon);

        // Se la velocità angolare è zero, imposta un valore casuale tra 0.25 e 0.35
        // all'inizio la ruota sta ferma, quindi la velocità angolare è zero
        if (!this.angVel)
          this.angVel = this.rand(0.25, 0.35);
      },
      error => {
          createAlert(getErrorMessage(error.error.message));
          this.spinning = false;
          return;
      }
    )
  }

  //calcola l'indice del settore in cui si trova la ruota in base a tutti i valori di angolo e di settori
  getIndex = () =>
    Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

  drawSector(sector, i) {
    const ang = this.arc0 * i;
    //salva lo stato del contesto nel canvas
    this.ctx.save();
    this.ctx.beginPath();
    //pattern mio modificato
    //imposta il colore del settore
    this.ctx.fillStyle = COLORS[i % COLORS.length];
    //sposta il contesto al centro del canvas
    this.ctx.moveTo(this.rad, this.rad);

    this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc0);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();
    // TEXT
    this.ctx.translate(this.rad, this.rad);
    this.ctx.rotate(ang + this.arc0 / 2);
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 22px Playfair Display';
    this.ctx.fillText(sector.label, this.rad - 10, 10);
    this.ctx.restore();
  }

  rotate(first = false) {
    //otteniamo l'indice del settore in cui si trova la ruota
    let index = this.getIndex();
    //verifico se l'indice è cambiato
    if (this.currentOptionIndex !== index) {
      //aggiorno l'indice corrente e riproduco il suono della ruota
      this.currentOptionIndex = index;
      this.playWheelSound();
    }
    //ottengo il settore in cui si trova la ruota
    const sector = this.sectors[index];
    // Imposto il colore di sfondo del elemento spin
    this.spin.nativeElement.style.background = sector.color;
    this.spin.nativeElement.style.background = COLORS[index % COLORS.length];
    // Applico una trasformazione di rotazione al canvas
    this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
    // Imposto il testo nell'elemento spin in base all'angolo di rotazione
    this.spin.nativeElement.textContent = !this.angVel ? 'spin' : sector.label;
  }

  bonusUscito : string;
  frame() {
    //se la velocità angolare è zero, non fare nulla
    if (!this.angVel) return;

    // Modifica: ferma la ruota quando raggiunge la destinazione
    if (this.getIndex() == this.destinationIndex && Math.abs(this.angVel) < 0.0027) {
      // Riproduci il suono di fine gioco e ferma la ruota
      this.winFineSound.nativeElement.play();
      this.angVel = 0;
      this.ang += 0.09; //serve per farla fermare poco dopo l'inizio del settore

      //calcoliamoci il bonus vincente tramite l'indiceDiDestinazione
      this.bonusUscito = this.sectors[this.destinationIndex].label;

      // Mostriamo il messaggio di congratulazioni
      this.showCongratulations = true;
      this.spinning = false;
    }

    if (this.angVel >= 0.0028) {
      this.angVel *= this.friction; // Decrement velocity by friction
    }
    else {  //verso la fine la decremento di meno altrimenti ci metterebbe anni
      this.angVel *= 0.9996;
    }
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    this.rotate();
  }

  playWheelSound() {
    if (this.wheelSound && this.wheelSound.nativeElement.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.wheelSound.nativeElement.currentTime = 0; // Riavvolgi l'audio
      this.wheelSound.nativeElement.play();
    }
  }
}
