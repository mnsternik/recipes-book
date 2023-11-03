import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, catchError, tap, BehaviorSubject } from "rxjs";

import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }

    user = new BehaviorSubject<User>(null);

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAC2_67N1YUtTfgFTKC3k1RQKJSZgFGfxk',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAC2_67N1YUtTfgFTKC3k1RQKJSZgFGfxk',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    )
                })
            )
    }

    logout() {
        this.user.next(null); 
        this.router.navigate(['/auth'])
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email,
            id,
            token,
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Email not found";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid login data';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Account is disabled';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid login data';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'This e-mail already exists';
                break;
        }
        return throwError(() => errorMessage);
    }
}