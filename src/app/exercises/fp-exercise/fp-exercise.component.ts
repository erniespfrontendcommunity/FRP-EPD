import { Component, OnInit } from '@angular/core';
import { stockData } from './stock-data.model';

interface StockInfo {
    name: string;
    value: number;
    market: string;
    sector: string;
}

@Component({
    selector: 'fp-exercise',
    template: `<h2 class="subtitle">FP - Exercise</h2>
    <div class="exercise" [innerHtml]="htmlContent"></div>`
})
export class FpExerciseComponent implements OnInit {

    htmlContent = `<pre><code>
  interface StockInfo {
    name: string;
    value: number;
    market: string;
    sector: string;
}
</code>
</pre>`;

    ngOnInit() {
        console.clear();
    }
}
