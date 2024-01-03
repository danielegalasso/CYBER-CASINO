import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials } from "../model/Credentials";
import { AuthToken } from "../model/AuthToken";
import { BackendConstants } from "../model/backendConstants";
import { RouteConstants } from "../model/routeConstants";
import { GameInformation } from "../model/GameInformation";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    constructor(private http:HttpClient) {}

    generateResult(gameInformation: GameInformation):Observable<string[]> {
        return this.http.post<string[]>(BackendConstants.url + BackendConstants.generateResult, gameInformation, {withCredentials: true});
    }
}