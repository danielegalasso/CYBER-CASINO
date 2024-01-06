import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials } from "../Authentication/Credentials";
import { AuthToken } from "../Authentication/AuthToken";
import { BackendConstants } from "../backendConstants";
import { RouteConstants } from "../routeConstants";
import { GameInformation } from "../Games/GameInformation";
import { Observable } from "rxjs";
import { GeneratedGame } from "../Games/GeneratedGame";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    constructor(private http:HttpClient, private authService: AuthenticationService) {}

    generateResult(gameInformation: GameInformation):Observable<GeneratedGame> {
        return this.http.post<GeneratedGame>(BackendConstants.url + BackendConstants.generateResult, gameInformation, {withCredentials: true});
    }

    getBalance():Observable<number> {
        return this.http.post<number>(BackendConstants.url + BackendConstants.getBalance,  this.authService.getToken(), {withCredentials: true});
    }
}