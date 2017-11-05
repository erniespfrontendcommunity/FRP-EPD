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

export const countObservableItems = (obs: Observable<any>) => obs.scan((acc, cur) => acc + 1, 0);

export const averageSpeed = (obs: Observable<Vehicle>) => countObservableItems(obs)
    .combineLatest(sumSpeeds(obs), (totalNumber, addedSpeed) => addedSpeed / totalNumber)

const sumSpeeds = (obs: Observable<Vehicle>) => obs.scan((acc, cur) => acc + cur.speed, 0);
// const obsVehiclesTotal = (obs: Observable<Vehicle>) => countObservableItems(obs)

const isType = (type: string) => (vehicle: Vehicle) => vehicle.type == type;
export const isCar = isType(CAR);
export const isBike = isType(BIKE);
export const isTruk = isType(TRUCK);