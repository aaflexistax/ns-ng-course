import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { alert } from '@nativescript/core';
import { getString, hasKey, remove, setString } from '@nativescript/core/application-settings';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private router: RouterExtensions) {}

    private API_KEY = 'AIzaSyDCmQERdr_DagBAs-qP4dMMYFQP_Hgohuk';
    private tokenExpirationTimer: any;
    private _user = new BehaviorSubject<User>(null);

    get user() {
        return this._user.asObservable();
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            .pipe(
                tap(res => {
                    this.handleLogin(email, res.idToken, res.localId, res.expiresIn);
                }),
                catchError(err => {
                    this.handleError(err.error.error.message);
                    return throwError(err);
                })
            );
    }

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, {
                email,
                password,
                returnSecureToken: true
            })
            .pipe(
                tap(res => {
                    this.handleLogin(email, res.idToken, res.localId, res.expiresIn);
                }),
                catchError(err => {
                    this.handleError(err.error.error.message);
                    return throwError(err);
                })
            );
    }

    logout() {
        this._user.next(null);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        remove('userData');
        this.router.navigate(['/auth'], { clearHistory: true });
    }

    autoLogin() {
        if (!hasKey('userData')) {
            return of(false);
        }
        const userData: { email: string; id: string; _token: string; _tokenExpirationDate: string } = JSON.parse(
            getString('userData')
        );

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }

        return of(false);
    }

    autoLogout(expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expiryDuration);
    }

    private handleLogin(email: string, token: string, userId: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);
        const user: User = new User(email, userId, token, expirationDate);
        setString('userData', JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('This email already exists');
                break;
            case 'INVALID_PASSWORD':
                alert('Invalid password');
                break;
            default:
                alert('Authentication failed, check your credentials');
        }
    }
}
