import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.scss'
})
export class RouletteComponent implements OnInit{
  ngOnInit() {
    window.location.href="http://localhost:8080/provaMia/javasWheel.html";
  }

}
