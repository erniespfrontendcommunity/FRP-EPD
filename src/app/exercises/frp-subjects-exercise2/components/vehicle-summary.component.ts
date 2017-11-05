import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { MinMaxValue, Vehicle, countObservableItems, CAR, BIKE, TRUCK, averageSpeed, isCar, isTruk, isBike } from '../utils/model';
import { Service } from '../utils/service';
import { Subscriber, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'vehicles-summary',
    templateUrl: 'vehicle-summary.component.html',
    styleUrls: ['vehicle-summary.component.scss']
})
export class VehiclesSummaryComponent implements OnInit {

    totalVehicles$: Observable<number>;
    speedAvg$: Observable<number>;
    speedViolations$: Observable<number>;
    minMax$: Observable<MinMaxValue>;

    cars$: Observable<Vehicle>;
    bikes$: Observable<Vehicle>;
    trucks$: Observable<Vehicle>;

    vehicles$: Observable<Vehicle>;

    constructor(public service: Service) {
        this.vehicles$ = this.service.vehicles$;
    }

    ngOnInit() {
        this.totalVehicles$ = countObservableItems(this.vehicles$);
        
        this.speedViolations$ = countObservableItems(
            this.vehicles$
            .filter(x=> x.speed > 120)
        );

        this.speedAvg$ = averageSpeed(this.vehicles$)
            // .combineLatest(sumSpeeds(this.vehicles$), (totalNumber, addedSpeed) => addedSpeed / totalNumber)

        this.minMax$ = getMinSpeed(this.vehicles$)
            .combineLatest(getMaxSpeed(this.vehicles$), (min, max) => {return {min, max}})

        this.cars$ = this.vehicles$.filter(isCar);
        this.trucks$ = this.vehicles$.filter(isTruk);
        this.bikes$ = this.vehicles$.filter(isBike);
    }
}

// const getSpeedSelector = (vehicle: Vehicle) => 
const getMinSpeed = (obs: Observable<Vehicle>) => obs.scan((acc, cur) => acc < cur.speed ? acc : cur.speed, 10000);
const getMaxSpeed = (obs: Observable<Vehicle>) => obs.scan((acc, cur) => acc > cur.speed ? acc : cur.speed, 0);

// const isCar = (vehicle: Vehicle) => vehicle.type == CAR;
// const isBike = (vehicle: Vehicle) => vehicle.type == BIKE;
// const isTruk = (vehicle: Vehicle) => vehicle.type == TRUCK;
