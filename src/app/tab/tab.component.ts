import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface TabData {
    label: string;
    index: number;
}

@Component({
    selector: 'app-tab',
    template: `{{ tab.label }}`,
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {

    @Input()
    tab: TabData;

    @Output()
    clicked: EventEmitter<boolean> = new EventEmitter();

    @HostListener('click')
    tabClicked() {
        this.clicked.emit(true);
    };
}
