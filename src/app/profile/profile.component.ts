import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { SimpleTransaction } from '../model/SimpleTransaction';
import { SimpleMatch } from '../model/Games/SimpleMatch';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    latestTransactions: SimpleTransaction[] = [];
    latestGamesResults: SimpleMatch[] = [];

    constructor(private apiCallerService: ApiCallerService) {}

    ngOnInit() {
        //per visualizzare l' HTML decommentare
        //const htmlFilePath = 'assets/profile/profile.html';
        //window.open(htmlFilePath, '_blank');
    }

    ngAfterViewInit() {
        console.log('Profile component initialized');
        this.loadLatestTransactions();
        this.loadLatestGamesResults();
    }

    loadLatestTransactions() {
        const additionalTransactionsToLoad = 10;
        this.apiCallerService.getLatestTransactionsByUser(additionalTransactionsToLoad)
            .subscribe(transactions => {
                this.latestTransactions = transactions;
                this.passDataToThymeleaf(); // Chiamare il metodo per passare i dati a Thymeleaf
            });
    }

    loadLatestGamesResults() {
        const additionalGamesToLoad = 10;
        this.apiCallerService.getLatestGamesResultsByUser(additionalGamesToLoad)
            .subscribe(games => {
                this.latestGamesResults = games;
                this.passDataToThymeleaf(); // Chiamare il metodo per passare i dati a Thymeleaf
            });
    }

    private passDataToThymeleaf() {
        // Passa le variabili al file HTML in assets utilizzando una variabile globale JavaScript
        window['latestTransactions'] = this.latestTransactions;
        window['latestGamesResults'] = this.latestGamesResults;

        // Apro l'HTML dopo aver impostato le variabili
        const htmlFilePath = 'assets/profile/profile.html';
        window.open(htmlFilePath, '_blank');
    }
}
