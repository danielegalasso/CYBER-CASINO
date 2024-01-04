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
    
    isAdmin():boolean {
        //Ernesto crea is Admin
        return true;
    }

    register(username: string, email: string, password: string, confirmPassword: string) {
        //Ernesto fai il register
    }

    login(username, password){
        //dato un username e password effuttua il login (solo se esiste l'utente) e si salva un token
        

        /*
        let credentials: Credentials = {"username": username, "password": password};
        this.http.post<AuthToken>(BackendConstants.url + BackendConstants.login, credentials, {withCredentials: true})
            .subscribe(response => {
                this.setToken(response.token);
                this.router.navigate([RouteConstants.home]);
            })
        */

    }

    logout() {
        // remove user from local storage to log user out
        this.removeToken();
        this.router.navigate([RouteConstants.home]);
        this.isAuthent = false;
    }



    isAuthent = false;
    isAuthenticated():boolean {
        if (this.isAuthent){
            return true;
        }
        return false;
        /*return this.getToken() != undefined*/;
    }

    getToken() {
        if (this.token == undefined) {
            this.token = localStorage.getItem(this.tokenName);
        }
        return this.token;
    }

    //private methods
    private setToken(token: string) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    private removeToken() {
        this.token = undefined;
        localStorage.removeItem(this.tokenName);
    }
};