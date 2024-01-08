import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-horse-race',
  templateUrl: './horse-race.component.html',
  styleUrl: './horse-race.component.scss'
})
export class HorseRaceComponent implements OnInit {
  ngOnInit() {
    window.location.href="http://localhost:8080/horseRacing/index.html";
  }
}
