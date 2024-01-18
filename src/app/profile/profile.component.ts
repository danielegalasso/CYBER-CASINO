import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../model/services/apiCaller.service';
import {AuthenticationService} from "../model/services/authentication.service";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    constructor(private apiCallerService: ApiCallerService, private authService: AuthenticationService, private http: HttpClient){}

    readonly numTransactionsToShow = 5;
    readonly numMatchesToShow = 5;

    ngOnInit() {
        const token = this.authService.getTokenValue();
        if (token){ //posso ometterlo in quanto se arriva qua è gia loggato quindi ha il token??
          const profileUrl = `http://localhost:8080/profile?token=${token}&transactionsToShow=${this.numTransactionsToShow}&matchesToShow=${this.numMatchesToShow}`;
          window.location.href = profileUrl;
        }else {
          console.error('Impossibile ottenere il token utente.');
        }
    }

}
