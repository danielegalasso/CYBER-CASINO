import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials } from "../model/Authentication/Credentials";
import { AuthToken } from "../model/Authentication/AuthToken";
import { BackendConstants } from "../model/backendConstants";
import { RouteConstants } from "../model/routeConstants";
import { SimpleUser } from "../model/Authentication/SimpleUser";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private credentials: Credentials;
    readonly tokenName = 'sessionToken';
    private token:string | undefined = undefined;

    constructor(private http: HttpClient, private router:Router) { }
    
    isAdmin():boolean {
        return this.credentials.username == "admin";
    }

    register(username: string, email: string, password: string) {
        let simpleUser: SimpleUser = {"username": username, "email": email, "password": password};
        this.http.post<boolean>(BackendConstants.url + BackendConstants.register, simpleUser, {withCredentials: true})
            .subscribe(response => {
                if (response) {
                    alert("Registration successful!");
                    this.login(username, password);
                }
                else {
                    alert("Registration failed!");
                }
            });
    }

    login(username, password){
        this.credentials = {"username": username, "password": password};
        this.http.post<AuthToken>(BackendConstants.url + BackendConstants.login, this.credentials)
            .subscribe(response => {
                console.log(response);
                if (response == null) {
                    alert("Login failed!");
                    return;
                }
                this.setToken(response.token);
                this.router.navigate([RouteConstants.home]);
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.removeToken();
        this.router.navigate([RouteConstants.home]);
    }

    isAuthenticated():boolean {
        return this.getToken() != undefined;
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