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

        console.log(mostValue(stockData));

        console.log(getSummaryByMarket(stockData));

        console.log(mostValueFromNasdaq(stockData));

        console.log(countNasdaqBySector(stockData)('Technology'));

        console.log(sortStocks(stockData.filter(nasdaqSelector)));
    }
}


const get = property => object => object[property];

const nasdaq = get('NASDAQ');

const value = get('value');

const greaterByValue = (a: StockInfo, b: StockInfo) => value(a) > value (b) ? a : b;

const mostValue = (stockData) => stockData.reduce((acc: StockInfo, cur: StockInfo) => greaterByValue(acc, cur));


//creem una interface que ens ajudi:
interface Selector extends Function {
    (key: string, value: any) : (p: any) => boolean;
}

const selector: Selector = (key: string, value: any) => p => p[key] === value;

const compose = (...fns) => args => fns.reduce((y, f) => f(y), args);



interface Summary {
    [market: string]: Array<StockInfo>;
}

const containsMarket = (s: Summary) => (market: string) => s.hasOwnProperty(market);

//funció d'acumulació:
const getSummaryByMarket = (stockData: Array<StockInfo>) => stockData.reduce((s: Summary, currentStock: StockInfo) => {
    if (!containsMarket(s)(currentStock.market)) {
        return {...s, ...{ [currentStock.market]: [currentStock] }};
    } else {
        const marketStocks = [...s[currentStock.market], currentStock];
        return {...s, ...{ [currentStock.market]: marketStocks }};
    }
}, {});

const mostValueFromNasdaq = compose(getSummaryByMarket, nasdaq, mostValue);


const getSummaryBySector = (stockData: Array<StockInfo>) => stockData.reduce((s: Summary, currentStock: StockInfo) => {
    if (!containsMarket(s)(currentStock.sector)) {
        return {...s, ...{ [currentStock.sector]: [currentStock] }};
    } else {
        const marketStocks = [...s[currentStock.sector], currentStock];
        return {...s, ...{ [currentStock.sector]: marketStocks }};
    }
}, {});

const getSummaryByField = field => (stockData: Array<StockInfo>) => stockData.reduce((s: Summary, currentStock: StockInfo) => {
    if (!containsMarket(s)(currentStock[field])) {
        return {...s, ...{ [currentStock[field]]: [currentStock] }};
    } else {
        const marketStocks = [...s[currentStock[field]], currentStock];
        return {...s, ...{ [currentStock[field]]: marketStocks }};
    }
}, {});

const summaryByMarket = getSummaryByField('market');
const summaryBySector = getSummaryByField('sector');

const countNasdaqBySector = stockData => sector => getSummaryBySector(getSummaryByMarket(stockData)['NASDAQ'])[sector].length;


//Generic sort

type Comparator<A> = (a: A, b: A) => boolean;
type Comparison<A> = (a: A, b: A) => number;
type Compare = <A>(test: Comparator<A>) => Comparison<A>;

const compareGeneric: Compare = (test) => (a, b) =>
    test(a, b) ? -1 :
        test(b, a) ? 1 :
            0;

const gt : Comparator<StockInfo> = (a, b) => a.value < b.value;

const sortAsc = compareGeneric(gt);

const sortStocks = (stockData: Array<StockInfo>) => [...stockData].sort(sortAsc);

const nasdaqSelector = selector('market', 'NASDAQ');