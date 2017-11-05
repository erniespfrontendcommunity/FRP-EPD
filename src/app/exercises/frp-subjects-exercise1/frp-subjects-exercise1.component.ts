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


const getShapeValue = (s: Shape) => s.value % 2 === 0 ? 'Even' : 'Odd';

function byTypeFilter(type: ShapeType): Filter {
    return (s: Shape) => type === 'All' || s.type === type;
}

function byValueFilter(value: ShapeValue): Filter {
    return (s: Shape) => value === 'All' || getShapeValue(s) === value;
}

const multipleFilter = (filters: Filter[]) => (s: Shape) => filters.every(f => f(s));


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

        Observable.combineLatest(this.selectedShapeFilter$, this.selectedValueFilter$)
            .map(([shapeFilter, valueFilter]) => this.shapes.filter(
                multipleFilter([byTypeFilter(shapeFilter), byValueFilter(valueFilter)]))
            )
            .subscribe(this.filteredShapes$);
    }

    clearFilter(){
        this.shapeSelect.nativeElement.value = 'All';
        this.valueSelect.nativeElement.value = 'All';
        this.selectedShapeFilter$.next('All');
        this.selectedValueFilter$.next('All');
    }
}