import { CommonModule } from '@angular/common';
import { HostListener, AfterViewInit, Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { SlotMachine } from '../model/Games/SlotMachine/slotMachine';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-slot-machine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-machine.component.html',
  styleUrl: './slot-machine.component.scss'
})
export class SlotMachineComponent implements OnInit, AfterViewInit {
  @Input() slotMachine!: SlotMachine;

  iconWidth!: number;
  iconHeight!: number;

  reelsList: Array<Element> = [];
  shifters: Array<number> = [0, 0, 0];

  result: Array<string> = [];

  readonly additionalSpin: number = 10;

  rolling = new BehaviorSubject<boolean>(false);
  rollingObservable = this.rolling.asObservable();

  @ViewChild('musicPlayer') audioPlayer!: ElementRef;
  @ViewChild('sfxPlayer') sfxPlayer!: ElementRef;

  ngOnInit(): void {
    this.iconWidth = 225 * this.slotMachine.SlotSizePercent / 100;
    this.iconHeight = 210 * this.slotMachine.SlotSizePercent / 100;
    this.reelsAdder();

    const styles = document.documentElement.style;
    styles.setProperty('--icon-width', this.iconWidth.toString()+"px");
    styles.setProperty('--icon-height', this.iconHeight.toString()+"px");
    styles.setProperty('--num-reels', this.slotMachine.NumReels.toString());
    styles.setProperty('--slot-padding', this.slotMachine.SlotPadding.toString());
    styles.setProperty('--slot-start-color', this.slotMachine.SlotStartColor);
    styles.setProperty('--slot-end-color', this.slotMachine.SlotEndColor);
    styles.setProperty('--slot-rect-color', this.slotMachine.SlotRectColor);
    styles.setProperty('--win-start-color', this.slotMachine.WinStartColor);
    styles.setProperty('--win-end-color', this.slotMachine.WinEndColor);
    styles.setProperty('--num-icons', this.slotMachine.NumIcons.toString());
  }

  reelsAdder(): void {
    const slotsDiv = document.querySelector(".slots");

    for (let i = 0; i < this.slotMachine.NumReels; i++) {
      const reel = document.createElement("div");
      reel.classList.add("reel");
      document.querySelector(".slots")?.appendChild(reel);

      reel.style.position = "relative";
      reel.style.width = this.iconWidth.toString() + "px";
      reel.style.height = (3 * this.iconHeight).toString() + "px";
      reel.style.border = "1px solid rgba(black, 0.3);";
      reel.style.borderRadius = "3px";
      reel.style.overflow = "hidden";
      reel.style.backgroundImage = `url(../assets/slotMachine/${this.slotMachine.SlotType.toLowerCase()}/reels/${i}.jpg)`;
      reel.style.backgroundSize = "100%";
      reel.style.backgroundPosition = "0 0";
      reel.style.backgroundRepeat = "repeat-y";

      const reelMask = document.createElement("div");
      reelMask.classList.add("reel-mask");
      reelMask.style.position = "absolute";
      reelMask.style.top = "0";
      reelMask.style.left = "0";
      reelMask.style.width = "100%";
      reelMask.style.height = "100%";
      reelMask.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5) 0%, transparent 33%, transparent 66%, rgba(0, 0, 0, 0.5) 100%)";

      reel.appendChild(reelMask);

      slotsDiv!.appendChild(reel);
    }
  }

  ngAfterViewInit(): void {
    //get the reels
    this.reelsList = Array.from(document.querySelectorAll('.slots > .reel'));

    this.randomizeReels();
  }


  //slot functions
  roll(reel: HTMLElement, offset: number, additionalSpin: number): Promise<void> {
    //calculate the element position in the reel
    let elem_pos: number = (this.slotMachine.ElementPositions.get(this.result[offset]))?.at(offset)!;

    //calculate the delta for the reel
    const delta = (offset + 2 * (offset + 1) + additionalSpin) * this.slotMachine.NumIcons - (elem_pos - 1 + this.shifters[offset]) % this.slotMachine.NumIcons;

    //calculate the new shifter value
    this.shifters[offset] = this.slotMachine.NumIcons - elem_pos + 1;

    //do the roll
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style.getPropertyValue("background-position-y"));

    return new Promise((resolve) => {

      reel.style.transition = `background-position-y ${this.slotMachine.NumIcons - 1 + delta * this.slotMachine.TimePerIcon}ms ease-out`;
      reel.style.backgroundPositionY = `${backgroundPositionY + delta * this.iconHeight}px`;

      setTimeout(() => { resolve() }, this.slotMachine.NumIcons - 1 + delta * this.slotMachine.TimePerIcon)
    });
  }

  rollAll(): void {
    if (this.winMode) {
      this.stopSFX();
      document.querySelector(".slots")?.classList.remove('win');
      this.winMode = false;
    }
    this.playSpinSFX();

    Promise
      .all(this.reelsList.map((reel: any, i: number) => {
        if (i == this.reelsList.length - 1 && this.checkPossibleWin())
          return this.roll(reel, i, this.additionalSpin);
        return this.roll(reel, i, 0);
      }))
      .then(() => {
        this.stopSFX();
        this.checkWin();
        this.rolling.next(false);
      });
  }

  checkPossibleWin(): boolean {
    let firstElement = this.result[0];

    for (let i = 1; i < this.result.length; i++) {
      if (this.result[i] != firstElement) {
        return false;
      }
    }
    return true;
  }

  private winMode: boolean = false;
  checkWin(): void {
    if (this.result.every((element, index) => index === 0 || element === this.result[0])) {
      this.playWinSFX();
      //do animation
      document.querySelector(".slots")?.classList.add('win');
      this.winMode = true;
      setTimeout(() => {
        ;
      }, 4200);
    }
  }

  randomizeReels(): void {
    for (let i = 0; i < this.reelsList.length; i++) {
      this.shifters[i] = this.getRandomInt(0, this.slotMachine.NumIcons - 1);
    }
    this.reelsList.map((reel: any, i: number) => {
      reel.style.backgroundPositionY = `${this.shifters[i] * this.iconHeight}px`;
    });
  }


  //utility functions
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private hasPlayed: boolean = false;
  @HostListener('document:click', ['$event'])
  musicPlay(): void {
    if (this.hasPlayed) return;
    this.hasPlayed = true;
    const audioElement: HTMLAudioElement = this.audioPlayer.nativeElement;
    audioElement.src = `assets/slotMachine/${this.slotMachine.SlotType.toLowerCase()}/music/music.mp3`;
    audioElement.loop = true;
    //audioElement.load();
    audioElement.play();
  }

  playSpinSFX(): void {
    this.playSFX('spin');
  }

  playWinSFX(): void {
    this.playSFX('win');
  }

  playSFX(sfx: string): void {
    const audioElement: HTMLAudioElement = this.sfxPlayer.nativeElement;
    audioElement.src = `assets/slotMachine/${this.slotMachine.SlotType.toLowerCase()}/sfx/${sfx}.mp3`;
    audioElement.loop = true;
    audioElement.load();
    audioElement.play();
  }

  stopSFX(): void {
    const audioElement: HTMLAudioElement = this.sfxPlayer.nativeElement;
    audioElement.pause();
  }
}