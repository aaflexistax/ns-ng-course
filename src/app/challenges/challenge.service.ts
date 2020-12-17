import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Challenge } from './challenge.model';
import { Day, DayStatus } from './day.model';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(private http: HttpClient) {}

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
            console.log(challenge.days[dayIndex]);
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
        return this.http
            .get<{ title: string; description: string; month: number; year: number; _days?: Day[] }>(
                'https://ng-ns-course-aa-default-rtdb.europe-west1.firebasedatabase.app/challenge.json'
            )
            .pipe(
                tap(res => {
                    if (!res) return;
                    let ch = new Challenge(res.title, res.description, res.year, res.month, res._days);
                    this._currentChallenge.next(ch);
                })
            );
    }

    saveToServer(challenge: Challenge) {
        this.http
            .put('https://ng-ns-course-aa-default-rtdb.europe-west1.firebasedatabase.app/challenge.json', challenge)
            .subscribe(res => {
                console.log(res);
            });
    }
}
