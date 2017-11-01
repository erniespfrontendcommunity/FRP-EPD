import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../utils/model';

@Component({
    selector: 'summary-item',
    template: `
                <div class="summary-item">
                  <div class="icon {{iconClass}}"></div>
                  <div class="data">
                    <div>counter: {{ counter$ | async }}</div>
                    <div>speed: {{ (vehicles$ | async)?.speed }} km/h</div>
                    <div>Avg (km/h): {{ (speedAvg$ | async)?.toFixed(2) }}</div>
                  </div>
                </div>
              `,
    styles:   [`
        .summary-item {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
        }

        .icon {
            font-size: 40px;
            color: white;
        }

        .data {
            padding-left: 20px;
            display: flex;
            align-items: flex-start;
            flex-flow: column;
            min-width: 250px;
        }
    `]
})
export class SummaryItemComponent implements OnInit{
    @Input() iconClass: string;
    @Input() bgColor;
    @Input() vehicles$: Observable<Vehicle>;

    counter$: Observable<number>;
    speedAvg$: Observable<number>;

    ngOnInit() {
    }
}
