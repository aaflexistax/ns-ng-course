import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Challenge } from './challenge.model';
import { Day, DayStatus } from './day.model';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(private http: HttpClient, private authService: AuthService) {}

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);

            challenge.days[dayIndex].status = status;
            this.saveToServer(challenge);
            this._currentChallenge.next(challenge);
        });
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(ch => {
            const challenge = ch;
            challenge.title = title;
            challenge.description = description;
            this.saveToServer(challenge);
            this._currentChallenge.next(challenge);
        });
    }

    fetchCurrentChallenge() {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.get<{
                    title: string;
                    description: string;
                    month: number;
                    year: number;
                    _days?: Day[];
                }>(
                    `https://ng-ns-course-aa-default-rtdb.europe-west1.firebasedatabase.app/challenge/${currentUser.id}.json?auth=${currentUser.token}`
                );
            }),
            tap(res => {
                if (!res) return;
                let ch = new Challenge(res.title, res.description, res.year, res.month, res._days);
                this._currentChallenge.next(ch);
            })
        );
    }

    saveToServer(challenge: Challenge) {
        return this.authService.user.pipe(
            take(1),
            switchMap(currentUser => {
                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }
                return this.http.put(
                    `https://ng-ns-course-aa-default-rtdb.europe-west1.firebasedatabase.app/challenge/${currentUser.id}.json?auth=${currentUser.token}`,
                    challenge
                );
            })
        );
    }
}
