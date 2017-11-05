import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../utils/model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface Summary {
    time: Date;
    car: number;
    truck: number;
    bike: number;
}

@Component({
    selector: 'vehicles-minute-summary',
    templateUrl: 'vehicle-minute-summary.component.html',
    styleUrls: ['vehicle-minute-summary.component.scss']
})
export class VehicleMinuteSummaryComponent implements OnInit {

    @Input() vehicles$: Observable<Vehicle>;

    summary$: BehaviorSubject<Summary[]> = new BehaviorSubject([]);

    ngOnInit() {
        this.vehicles$.bufferTime(60000)
            .map(vehicles => summaryByVehicleType(vehicles))
            .map(summary => [...this.summary$.getValue(), summary])
            .subscribe(this.summary$);
    }
    formatDate(date:Date) {
        let hours: string | number = date.getHours();
        let minutes: string | number = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes;
    }
    getLast15 = (items: Array<any>) => items.reverse().slice(0, 15);
}

const summaryByVehicleType = vehicles => vehicles.reduce((s: Summary, vehicle) => {
    const sum = {...s};
    sum[vehicle.type]++;
    return sum;
}, {
    time: new Date(),
    car: 0,
    truck: 0,
    bike: 0
});

