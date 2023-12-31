import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bonus-module',
  templateUrl: './bonus-module.component.html',
  styleUrl: './bonus-module.component.scss'
})
export class BonusModuleComponent {

    
constructor(private modalService: NgbModal, public dataService: DataService) {
    
}

public open(modal: any): void {
  this.modalService.open(modal);
}


}
