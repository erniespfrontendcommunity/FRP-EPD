import { Observable } from 'rxjs/Observable';

export const vehicleTypes = ['car', 'bike', 'truck'];

export const CAR = 'car';
export const BIKE = 'bike';
export const TRUCK = 'truck';

export interface MinMaxValue {
    min: number;
    max: number;
}

export class Vehicle {
    constructor(public type: string, public speed: number) {}
    toString = () => `${this.type} at ${this.speed} km/h`
}

export const getRangeValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const generateVehicle = () => new Vehicle(vehicleTypes[getRangeValue(0, vehicleTypes.length - 1)], getRangeValue(60, 160));

export const countObservableItems = (obs: Observable<any>) => obs.scan(total => total + 1, 0);
