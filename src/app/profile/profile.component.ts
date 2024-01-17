import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { SimpleTransaction } from '../model/SimpleTransaction';
import { SimpleMatch } from '../model/Games/SimpleMatch';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    latestTransactions: SimpleTransaction[] = [];
    latestGamesResults: SimpleMatch[] = [];

    constructor(private apiCallerService: ApiCallerService, private authService: AuthenticationService){}



    ngOnInit() {
        const token = this.authService.getTokenValue();
        if (token){ //posso ometterlo in quanto se arriva qua è gia loggato quindi ha il token??
          const profileUrl = `http://localhost:8080/profile?token=${token}`;
          window.location.href = profileUrl;
        }else {
          console.error('Impossibile ottenere il token utente.');
        }
      }


    /*

    ngAfterViewInit() {

        console.log('Profile component initialized');
        //this.loadLatestTransactions();
        this.loadLatestGamesResults();

    }

    loadLatestTransactions() {
        const additionalTransactionsToLoad = 10;
        this.apiCallerService.getLatestTransactionsByUser(additionalTransactionsToLoad)
            .subscribe(transactions => {
                this.latestTransactions = transactions;
                console.log(this.latestTransactions);
                //this.passDataToThymeleaf(); // Chiamare il metodo per passare i dati a Thymeleaf
            });
    }

    loadLatestGamesResults() {
        const additionalGamesToLoad = 10;
        this.apiCallerService.getLatestGamesResultsByUser(additionalGamesToLoad)
            .subscribe(games => {
                this.latestGamesResults = games;
                console.log(this.latestGamesResults);
                //this.passDataToThymeleaf(); // Chiamare il metodo per passare i dati a Thymeleaf
            });
    }


    private passDataToThymeleaf() {
        // Passa le variabili al file HTML in assets utilizzando una variabile globale JavaScript
        //window['latestTransactions'] = this.latestTransactions;
        window['latestGamesResults'] = this.latestGamesResults;

        // Apro l'HTML dopo aver impostato le variabili
    }*/
}
