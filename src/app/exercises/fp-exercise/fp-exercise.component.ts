import { Component, OnInit } from '@angular/core';
import { stockData } from './stock-data.model';

interface StockInfo {
    name: string;
    value: number;
    market: string;
    sector: string;
}


const get = prop => obj => obj[prop];

const value = get('value');

const greaterByValue = (a: StockInfo, b: StockInfo) => value(a) > value(b) ? a : b;

const mostValue = stockData => stockData.reduce((a: StockInfo, b: StockInfo) => greaterByValue(a, b));

////////////////////////////////////////


interface Summary {
    [market: string]: Array<StockInfo>;
}

const containsMarket = (s: Summary, market: string) => s.hasOwnProperty(market);

const getSummaryByMarket = (stockData: Array<StockInfo>) => stockData.reduce((s: Summary, currentStock: StockInfo) => {
    if (!containsMarket(s, currentStock.market)) {
        return {...s, ...{ [currentStock.market]: [currentStock] }};
    } else {
        const marketStocks = [...s[currentStock.market], currentStock];
        return {...s, ...{ [currentStock.market]: marketStocks }};
    }
}, {});

////////////////////////////////////////

const sortAsc = (a: StockInfo, b: StockInfo) => a.value - b.value;

const sortStocks = (stocks: Array<StockInfo>) => [ ...stocks].sort(sortAsc);

//////////////////////////////////////

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

        console.log(sortStocks(stockData));
    }
}
