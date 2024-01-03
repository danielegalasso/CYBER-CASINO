import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials } from "../model/Credentials";
import { AuthToken } from "../model/AuthToken";
import { BackendConstants } from "../model/backendConstants";
import { RouteConstants } from "../model/routeConstants";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    readonly tokenName = 'sessionToken';
    private token:string = undefined;

    constructor(private http: HttpClient, private router:Router) { }
    
    login(username, password) {
        let credentials: Credentials = {"username": username, "password": password};
        this.http.post<AuthToken>(BackendConstants.url + BackendConstants.login, credentials, {withCredentials: true})
            .subscribe(response => {
                this.setToken(response.token);
                this.router.navigate([RouteConstants.home]);
            })
    }

    logout() {
        // remove user from local storage to log user out
        this.removeToken();
        this.router.navigate([RouteConstants.home]);
    }

    isAuthenticated() {
        return this.getToken() != undefined;
    }

    //private methods
    private setToken(token: string) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    private getToken() {
        if (this.token == undefined) {
            this.token = localStorage.getItem(this.tokenName);
        }
        return this.token;
    }

    private removeToken() {
        this.token = undefined;
        localStorage.removeItem(this.tokenName);
    }
};