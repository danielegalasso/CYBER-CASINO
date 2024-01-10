import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Credentials } from "../Authentication/Credentials";
import { AuthToken } from "../Authentication/AuthToken";
import { BackendConstants } from "../backendConstants";
import { RouteConstants } from "../routeConstants";
import { SimpleUser } from "../Authentication/SimpleUser";
import { getErrorMessage } from "../ServerErrors";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private credentials: Credentials;
    readonly tokenName = 'sessionToken';
    private token:string = undefined;

    constructor(private http: HttpClient, private router:Router) { }

    isAdmin():boolean {
        return this.credentials.username == "admin";
    }

    register(username: string, email: string, password: string) {
        let simpleUser: SimpleUser = {"username": username, "email": email, "password": password};
        return this.http.post<boolean>(BackendConstants.url + BackendConstants.register, simpleUser);
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
            },
            error => {
                console.log(error);
                alert(getErrorMessage(error.error.message));
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.removeToken();
        this.router.navigate([RouteConstants.home]);
    }

    isAuthenticated():boolean {
        return this.getTokenValue() != undefined;
    }

    getTokenValue() {
        if (this.token == undefined) {
            this.token = localStorage.getItem(this.tokenName);
        }
        return this.token;
    }

    getToken(): AuthToken {
        let tokenValue = this.getTokenValue();
        if (tokenValue != undefined && tokenValue != null) {
            return {"token": tokenValue};
        }
        return null;
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
