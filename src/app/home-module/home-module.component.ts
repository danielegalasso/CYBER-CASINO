import { Component } from '@angular/core';


@Component({
  selector: 'app-home-module',
  templateUrl: './home-module.component.html',
  styleUrl: './home-module.component.scss'
})
export class HomeModuleComponent {
  isFreeSpinButtonClicked = false;

  onChangeView(): void {
    this.isFreeSpinButtonClicked = true;
  }


  

}
