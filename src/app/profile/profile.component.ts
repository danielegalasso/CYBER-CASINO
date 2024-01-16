import {Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { SimpleTransaction } from '../model/SimpleTransaction';
import { SimpleMatch } from '../model/Games/SimpleMatch';
import {AuthenticationService} from "../model/services/authentication.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    latestTransactions: SimpleTransaction[] = [];
    latestGamesResults: SimpleMatch[] = [];

    constructor(private apiCallerService: ApiCallerService, private authService: AuthenticationService){}

    ngOnInit() {
        this.loadLatestTransactions();
        this.loadLatestGamesResults();

        const token = this.authService.getTokenValue();
        if (token){
            const profileUrl = `http://localhost:8080/profile/profile.html?token=${token}`;
            window.location.href = profileUrl;
        }else {
            console.error('Impossibile ottenere il token utente.');
        }
       // window.addEventListener('message', this.onMessage.bind(this));
    }
    ngAfterViewInit() {
        //this.loadLatestTransactions();
        //this.loadLatestGamesResults();
    }

    loadLatestTransactions() {
        const additionalTransactionsToLoad = 10;
        this.apiCallerService.getLatestTransactionsByUser(additionalTransactionsToLoad)
            .subscribe(transactions => {
                this.latestTransactions = transactions;
            });
    }

    loadLatestGamesResults() {
        const additionalGamesToLoad = 10;
        this.apiCallerService.getLatestGamesResultsByUser(additionalGamesToLoad)
            .subscribe(games => {
                this.latestGamesResults = games;
            });
    }
}
