import { Component, OnInit } from '@angular/core';
import { stockData } from './stock-data.model';

interface StockInfo {
    name: string;
    value: number;
    market: string;
    sector: string;
}

const getMaxValueElement = (x: StockInfo, y: StockInfo) => x.value >= y.value ? x : y;
const maxValue = (stocks: StockInfo[]) => stocks.reduce((acc, cur) => getMaxValueElement(acc, cur));

const max = comparer => (array: Array<any>) =>  array.reduce((acc, cur) => comparer(acc, cur) > 0 ? acc : cur);
const maxValue2 = max((a: StockInfo, b: StockInfo) => a.value > b.value ? 1 : -1);

// ex 3: {marketName -> Array stocks } 
// const getMarketNameArray = marketName => (stoks: StockInfo[]) => getMarketNameObj;
// const getMarketNameObj = (marketName, arr: StockInfo[]) => { marketName, arr };
const filterByMarket = (marketName) => (stocks: StockInfo[]) => stocks.filter(stock => stock.market === marketName);
const addToArrayIfNotExist = (arr: string[], element: StockInfo) => arr.find(x => x == element.market) ? arr : [...arr, element.market];
const getSingleMaketArray = (stoks: StockInfo[]) => stoks.reduce((acc, cur) => addToArrayIfNotExist(acc, cur), []);

// ex 4: order array of stocks by value
const sortAsc = (a: StockInfo, b: StockInfo) => a.value - b.value;
const sortStocks = (stocks: StockInfo[]) => [...stocks].sort(sortAsc);

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

        // get bigger value
        // console.log("maxvalue");
        // console.log(maxValue(stockData));
        // console.log(maxValue2(stockData));

        // ex3
        // console.log(getSingleMaketArray(stockData));

        // ex 4
        console.log(sortStocks(stockData));
    }
}
