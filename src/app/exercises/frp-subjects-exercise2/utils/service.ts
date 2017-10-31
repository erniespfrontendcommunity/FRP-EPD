import { Injectable } from '@angular/core';
import { generateVehicle, getRangeValue, Vehicle } from './model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import { Subject } from 'rxjs/Subject';

function variableInterval(delay = 10, action: Function) {
    const timeout = setTimeout(() => {
        action();
        clearTimeout(timeout);
        variableInterval(getRangeValue(50, 400), action);
    }, delay);
}

@Injectable()
export class Service {

    public _vehicles$: Subject<Vehicle> = new Subject<Vehicle>();

    constructor() {
        variableInterval(10, () => this._vehicles$.next(generateVehicle()));
    }

    get vehicles$() : Observable<Vehicle> {
        return this._vehicles$.asObservable();
    }
}