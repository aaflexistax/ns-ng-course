import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Challenge } from './challenge.model';
import { DayStatus } from './day.model';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());
        // Save it to the server
        this._currentChallenge.next(newChallenge);
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);

            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            console.log(challenge.days[dayIndex]);
        });
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe(ch => {
            const challenge = ch;
            challenge.title = title;
            challenge.description = description;
            this._currentChallenge.next(challenge);
        });
    }
}
