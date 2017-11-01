import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { MinMaxValue, Vehicle } from '../utils/model';
import { Service } from '../utils/service';

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
    }
}