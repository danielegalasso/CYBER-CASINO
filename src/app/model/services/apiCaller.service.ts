import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendConstants } from "../backendConstants";
import { GameInformation } from "../Games/GameInformation";
import { Observable } from "rxjs";
import { GameResult } from "../Games/GameResult";
import { AuthenticationService } from "./authentication.service";
import { LeaderboardMatch } from "../Games/LeaderboardMatch";
import { Player } from "../Player";

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

    getLatestResultsForLeaderboard(): Observable<LeaderboardMatch[]> {
        return this.http.get<LeaderboardMatch[]>(BackendConstants.url + BackendConstants.getLatestResults);
    }

    getListOfAllUsers(): Observable<Player[]> {
        return this.http.post<Player[]>(BackendConstants.url + BackendConstants.getAllUsers, this.authService.getToken());
    
    }

    setUserBan(username: string, isBanned: boolean): Observable<boolean> {
        const requestBody = {
            "token": this.authService.getToken().token,
            "username": username,
            "isBanned": String(isBanned)
        };

        return this.http.post<boolean>(BackendConstants.url + BackendConstants.setUserBan, requestBody);
    }
}