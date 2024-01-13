import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SimpleMatch } from '../model/Games/SimpleMatch';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { getErrorMessage } from '../model/ServerErrors';
import { createAlert } from '../model/popupCreator';
import { AuthenticationService } from '../model/services/authentication.service';
import { Router } from '@angular/router';
import { RouteConstants } from '../model/routeConstants';


@Component({
  selector: 'app-complex-image',
  templateUrl: './complex-image.component.html',
  styleUrls: ['./complex-image.component.scss']
})
export class ComplexImageComponent implements OnInit {
  @Output() changeView = new EventEmitter<void>();

  constructor(private authService: AuthenticationService, private apiCallerService: ApiCallerService, private router: Router) { }

  onButtonClick(): void {
    this.changeView.emit();
  }

  openFreeSpin() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/' + RouteConstants.dailySpin]);
    }
    else {
      this.router.navigate(['/' + RouteConstants.login]);
    }
  }


  leaderboard: SimpleMatch[] = [
  ];

  ngOnInit() {
    let roulette = document.getElementById('roulette') as HTMLElement;
    let sloth = document.getElementById('sloth') as HTMLElement;
    let four = document.getElementById('4') as HTMLElement;
    let five = document.getElementById('5') as HTMLElement;
    let six = document.getElementById('6') as HTMLElement;
    let seven = document.getElementById('7') as HTMLElement;
    let nine = document.getElementById('9') as HTMLElement;
    let ten = document.getElementById('10') as HTMLElement;
    let eleven = document.getElementById('11') as HTMLElement;
    let twelve = document.getElementById('12') as HTMLElement;
    let thirteen = document.getElementById('13') as HTMLElement;
    let fifthteen = document.getElementById('15') as HTMLElement;
    let sixteen = document.getElementById('16') as HTMLElement;
    let seventeen = document.getElementById('17') as HTMLElement;
    let eighteen = document.getElementById('18') as HTMLElement;
    let nineteen = document.getElementById('19') as HTMLElement;

    let twentyone = document.getElementById('21') as HTMLElement;
    let twentytwo = document.getElementById('22') as HTMLElement;
    let twentythree = document.getElementById('23') as HTMLElement;
    let button = document.getElementById('button') as HTMLElement;




    window.addEventListener('scroll', () => {
      let value = window.scrollY;
      roulette.style.left = value * -0.425 + 'px';
      roulette.style.top = value * -0.25 + 'px';
      roulette.style.transform = 'rotate(' + value * -0.1 + 'deg)';
      roulette.style.transform = 'scale(' + (1 + value * 0.001) + ')';
      

      sloth.style.left = value * 0.325 + 'px';
      sloth.style.top = value * 0.011 + 'px';
      sloth.style.transform = 'rotate(' + value * 0.051 + 'deg)';
      sloth.style.transform = 'scale(' + (1 + value * 0.001) + ')';

      four.style.top = value * -1.5 + 'px';
      four.style.left = value * -2.5 + 'px';
      four.style.transform = 'rotate(' + value * -0.33 + 'deg)';

      five.style.top = value * -0.25 + 'px';
      five.style.left = value * 1.5 + 'px';
      five.style.transform = 'rotate(' + value * -0.33 + 'deg)';


      six.style.top = value * -1.5 + 'px';
      six.style.left = value * 3 + 'px';


      seven.style.top = value * -0.5 + 'px';
      seven.style.transform = 'rotate(' + value * 0.13 + 'deg)';

      nine.style.top = value * 1.5 + 'px';
      nine.style.left = value * 2.15 + 'px';
      nine.style.transform = 'rotate(' + value * 0.93 + 'deg)';
      nine.style.transform = 'scale(' + (1 + value * 0.001) + ')';

      ten.style.top = value * 0.61 + 'px';
      ten.style.left = value * -0.25 + 'px';
      ten.style.transform = 'rotate(' + value * 0.73 + 'deg)';

      //text
      eleven.style.top = value * 0.34 + 'px';
      eleven.style.left = value * -0.4 + 'px';
      eleven.style.transform = 'scale(' + (1 + value * 0.001) + ')';

      twelve.style.top = value * -0.55 + 'px';
      twelve.style.left = value * 0.5 + 'px';


      //button 
      button.style.transform = 'scale(' + (1 + value * 0.001) + ')';


      //money near 777
      thirteen.style.top = value * -0.8 + 'px';
      thirteen.style.left = value * -1.5 + 'px';
      thirteen.style.transform = 'rotate(' + value * -0.53 + 'deg)';
      thirteen.style.transform = 'scale(' + (1 + value * 0.001) + ')';

      fifthteen.style.top = value * -1.5 + 'px';
      fifthteen.style.left = value * -1.5 + 'px';

      //dado centrale
      sixteen.style.top = value * 0.015 + 'px';
      sixteen.style.left = value * 0.15 + 'px';
      sixteen.style.transform = 'rotate(' + value * -0.13 + 'deg)';
      sixteen.style.transform = 'scale(' + (1 + value * 0.002) + ')';

      //piccolo dado alto a destra
      seventeen.style.top = value * -0.3 + 'px';
      seventeen.style.left = value * 0.4 + 'px';

      //piccolo dado alto a destra
      eighteen.style.top = value * -0.50 + 'px';
      eighteen.style.left = value * 0.5 + 'px';


      //gold bar alto a sinistra
      nineteen.style.top = value * -0.75 + 'px';
      nineteen.style.left = value * -0.75 + 'px';
      nineteen.style.transform = 'scale(' + (1 + value * -0.003) + ')';

      // 5 3 gold
      twentyone.style.top = value * -0.45 + 'px';
      twentyone.style.left = value * 0.45 + 'px';
      twentyone.style.transform = 'rotate(' + value * 0.33 + 'deg)';
      twentyone.style.transform = 'scale(' + (1 + value * -0.001) + ')';

      //6 1 right
      twentytwo.style.top = value * -0.35 + 'px';
      twentytwo.style.left = value * -0.35 + 'px';
      twentytwo.style.transform = 'rotate(' + value * 0.13 + 'deg)';
      twentytwo.style.transform = 'scale(' + (1 + value * -0.003) + ')';


      // 6 1 left
      twentythree.style.top = value * -0.5 + 'px';
      twentythree.style.left = value * -0.95 + 'px';
      twentythree.style.transform = 'scale(' + (1 + value * 0.005) + ')';



    });

    this.updateLeaderboard();

    //update leaderboard periodically
    setInterval(() => {
      this.updateLeaderboard();
    }, 4000);
  }


  updating = false;
  updateLeaderboard() {
    if (this.updating) return;
    this.updating = true;

    //get latest results
    this.apiCallerService.getLatestResultsForLeaderboard().subscribe((results) => {
      this.leaderboard = results;
      this.updating = false;
    },
    (error) => {
      createAlert(getErrorMessage(error.error.message)).subscribe(resp => {
        if (resp.clickedButtonID)
          this.updating = false;
      });
    });
  }
}
