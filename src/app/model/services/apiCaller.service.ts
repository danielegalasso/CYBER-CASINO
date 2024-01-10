import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendConstants } from "../backendConstants";
import { GameInformation } from "../Games/GameInformation";
import { Observable } from "rxjs";
import { GameResult } from "../Games/GameResult";
import { AuthenticationService } from "./authentication.service";
import { SimpleMatch } from "../Games/SimpleMatch";
import { SimpleTransaction } from "../SimpleTransaction";

@Injectable({
    providedIn: 'root'
})
export class ApiCallerService {
    constructor(private http:HttpClient, private authService: AuthenticationService) {}

    generateResult(gameInformation: GameInformation):Observable<GameResult> {
        return this.http.post<GameResult>(BackendConstants.url + BackendConstants.play, gameInformation);
    }

    getBalance():Observable<number> {
        return this.http.post<number>(BackendConstants.url + BackendConstants.getBalance,  this.authService.getToken());
    }

    getLatestResults(): Observable<SimpleMatch[]> {
        return this.http.get<SimpleMatch[]>(BackendConstants.url + BackendConstants.getLatestResults);
    }

    setUserBan(username: string, isBanned: boolean): Observable<void> {
        return this.http.post<void>(BackendConstants.url + BackendConstants.setUserBan, {token: this.authService.getToken(), username: username, isBanned: isBanned});
    }

    getLatestTransactionsByUser(additionalTransactionsToLoad: number): Observable<SimpleTransaction[]> {
        return this.http.post<SimpleTransaction[]>(BackendConstants.url + BackendConstants.getLatestTransactionsByUser, {token: this.authService.getToken(), additionalTransactionsToLoad: additionalTransactionsToLoad});
    }

    getLatestGamesResultsByUser(additionalGamesToLoad: number): Observable<SimpleMatch[]> {
        return this.http.post<SimpleMatch[]>(BackendConstants.url + BackendConstants.getLatestGamesResultsByUser, {token: this.authService.getToken(), additionalGamesToLoad: additionalGamesToLoad});
    }
}
