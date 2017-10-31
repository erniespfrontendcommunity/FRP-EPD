import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'text-summary-item',
    template: `<div class="summary-item">
      <div class="title">{{ title }}</div>
      <div class="value">
        <div>{{ value }} {{ suffix}}</div>
      </div>
    </div>
              `,
    styles: [`        
        .title {
            font-size: 18px;
            padding: 10px;
        }

        .summary-item {
            color: white !important;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .value {
            width: 150px;
            font-size: 50px;
        }
    `],
    encapsulation: ViewEncapsulation.Emulated
})
export class TextSummaryItemComponent  {

    @Input() title: string;
    @Input() value: any;
    @Input() suffix: string;
}
