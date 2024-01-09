import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendConstants } from "../backendConstants";
import { GameInformation } from "../Games/GameInformation";
import { Observable } from "rxjs";
import { GameResult } from "../Games/GameResult";
import { AuthenticationService } from "./authentication.service";
import { SimpleMatch } from "../Games/SimpleMatch";

@Injectable({
    providedIn: 'root'
})
export class GamesService {
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
}
