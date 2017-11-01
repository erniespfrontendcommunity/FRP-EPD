import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

type ShapeType = 'All' | 'Square' | 'Circle';

type ShapeValue = 'All' | 'Even' | 'Odd';

const AVAILABLE_TYPES: ShapeType[] = ['Square', 'Circle'];

type Filter = (s: Shape) => boolean;

interface Shape {
    type: ShapeType;
    value: number;
}

function generateShapes(length): Shape[] {
    return Array(length).fill(0).map((e,i)=> {
        return {value: i + 1, type: _.sample(AVAILABLE_TYPES)};
    });
}

@Component({
    selector:    'frp-subjects-exercise1',
    templateUrl: 'frp-subjects-exercise1.component.html',
    styleUrls: ['frp-subjects-exercise1.component.scss']
})
export class FRPSubjectsExercise1Component implements OnInit {
    @ViewChild('shapeSelect') shapeSelect: ElementRef;
    @ViewChild('valueSelect') valueSelect: ElementRef;

    private shapes: Shape[] = generateShapes(100);

    filteredShapes$: BehaviorSubject<Shape[]> = new BehaviorSubject<Shape[]>(null);
    selectedShapeFilter$ : BehaviorSubject<ShapeType> = new BehaviorSubject<ShapeType>('All');
    selectedValueFilter$ : BehaviorSubject<ShapeValue> = new BehaviorSubject<ShapeValue>('All');

    shapeTypes : ShapeType[] = ['All', 'Circle', 'Square' ];
    shapeValues : ShapeValue[] = ['All', 'Even', 'Odd' ];

    ngOnInit() {
    }

    clearFilter(){
        this.shapeSelect.nativeElement.value = 'All';
        this.valueSelect.nativeElement.value = 'All';
        this.selectedShapeFilter$.next('All');
        this.selectedValueFilter$.next('All');
    }
}