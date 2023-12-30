import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../service/data.service';

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


  constructor(private modalService: NgbModal, public dataService: DataService) {
    
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
