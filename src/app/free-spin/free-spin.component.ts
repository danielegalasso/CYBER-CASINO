import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../model/services/data.service';
import { AuthenticationService } from '../model/services/authentication.service';
import { GamesService } from '../model/services/games.service';
import { GameInformation } from '../model/Games/GameInformation';
import { generate } from 'rxjs';
import { GameType } from '../model/Games/GameType';
import { DailySpinConstants } from '../model/Games/DailySpin/DailySpinConstants';
import { Router } from '@angular/router';

//const COLORS = ['#f82', '#0bf', '#fb0', '#0fb', '#b0f', '#f0b', '#bf0'];
const COLORS = ['#2b1d6b', '#4e06c2', '#7f14c7'];

@Component({
  selector: 'app-free-spin',
  templateUrl: './free-spin.component.html',
  styleUrl: './free-spin.component.scss'
})
export class FreeSpinComponent implements AfterViewInit, DoCheck {

  constructor(private authService: AuthenticationService, private gamesService: GamesService, private router: Router) {}
  ngDoCheck(): void {
    this.engine();
  }

  ngAfterViewInit(): void {
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

  // Aggiungi questa variabile -----------
  destinationIndex?: number;

  rand = (m, M) => Math.random() * (M - m) + m;
  tot;
  ctx: CanvasRenderingContext2D;
  dia;
  rad;
  PI;
  TAU;
  arc0;

  friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  lastSelection;

  showCongratulations = false;

  createWheel() {
    this.ctx = this.wheel.nativeElement.getContext('2d');
    this.dia = this.ctx.canvas.width;
    this.tot = this.sectors.length;
    this.rad = this.dia / 2;
    this.PI = Math.PI;
    this.TAU = 2 * this.PI;

    this.arc0 = this.TAU / this.sectors.length;
    this.sectors.forEach((sector, i) => this.drawSector(sector, i));
    this.rotate(true);
  }

  spinning = false;
  noSpinToday = false;

  spinner() {
    if (!this.authService.isAuthenticated()) {
      // Se non è loggato, mostra l'alert
      this.router.navigate(['/login']);
      return;
    }

    if (this.spinning) {
      return;
    }
    this.spinning = true;

    let gameinfo: GameInformation = {sessionToken: this.authService.getTokenValue(), gameType: GameType.DAILY_SPIN, bet: 0, betOn: null, additionalInfo: ""};
    this.gamesService.generateResult(gameinfo).subscribe(
      generatedGame => {
        console.log(generatedGame);

        let amountWon = parseInt(generatedGame.result.at(0));
        this.destinationIndex = DailySpinConstants.valueIndexMap.get(amountWon);

        if (!this.angVel)
          this.angVel = this.rand(0.25, 0.35);
      },
      error => {
          this.noSpinToday = true;
          this.spinning = false;
          return;
      }
    )
  }

  getIndex = () =>
    Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

  drawSector(sector, i) {
    const ang = this.arc0 * i;
    this.ctx.save();
    this.ctx.beginPath();
    //pattern mio modificato
    this.ctx.fillStyle = COLORS[i % COLORS.length];
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
    let index = this.getIndex();
    if (this.currentOptionIndex !== index) {
      this.currentOptionIndex = index;
      this.playWheelSound();
    }
    const sector = this.sectors[index];
    this.spin.nativeElement.style.background = sector.color;
    this.spin.nativeElement.style.background = COLORS[index % COLORS.length];

    this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
    this.spin.nativeElement.textContent = !this.angVel ? 'spin' : sector.label;
  }

  bonusUscito : string;
  frame() {
    if (!this.angVel) return;
    // Modifica: ferma la ruota quando raggiunge la destinazione
    if (this.getIndex() == this.destinationIndex && Math.abs(this.angVel) < 0.0027) {
      this.winFineSound.nativeElement.play();
      this.angVel = 0;
      this.ang += 0.09;

      //calcoliamoci il bonus vincente tramite l'indiceDiDestinazione
      this.bonusUscito = this.sectors[this.destinationIndex].label;

      // Mostriamo il messaggio di congratulazioni
      this.showCongratulations = true;
      this.spinning = false;

      /* il salvataggio della data non lo faccio qua ma all'inizio, cosi se l'utente chiude la pagina prima di vedere il messaggio di congratulazioni, non gli viene comunque concesso un altro spin
      if (!this.lastSpinDate) {
        this.lastSpinDate = new Date();
        this.saveLastSpinDate();
      } */
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

  engine() {
    requestAnimationFrame(this.frame.bind(this));
  }

  playWheelSound() {
    if (this.wheelSound && this.wheelSound.nativeElement.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.wheelSound.nativeElement.currentTime = 0; // Riavvolgi l'audio
      this.wheelSound.nativeElement.play();
    }
  }
}
