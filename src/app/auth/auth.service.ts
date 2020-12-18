import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]', {
            email,
            password
        });
    }

    signUp(email: string, password: string) {
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', {
            email,
            password
        });
    }
}
