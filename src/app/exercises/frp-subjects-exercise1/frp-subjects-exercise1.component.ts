import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

type ShapeType = 'All' | 'Square' | 'Circle';

type ShapeValue = 'All' | 'Even' | 'Odd';

const AVAILABLE_TYPES: ShapeType[] = ['Square', 'Circle'];

type ShapeFilter = { type: ShapeType, value: ShapeValue};

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
        this.selectedShapeFilter$
            .combineLatest(this.selectedValueFilter$, (shape, value) => [shape, value])
            // .filter(_ => filterValue())
            .do(console.log)
            .map(([shapeFilter, valueFilter]) => this.shapes
                .filter(filterValue(valueFilter))
                .filter(filterShape(shapeFilter))
            )
            .subscribe(this.filteredShapes$);
            // .subscribe(_ => {
            //     // console.log(_)
                
            //     let filteredShapes = this.shapes
            //         .filter(filterValue(_.value))
            //         .filter(filterShape(_.type))

            //     this.filteredShapes$.next(filteredShapes)
            // });

        
    }

    clearFilter(){
        this.shapeSelect.nativeElement.value = 'All';
        this.valueSelect.nativeElement.value = 'All';
        this.selectedShapeFilter$.next('All');
        this.selectedValueFilter$.next('All');
    }
}

const isOdd = (value: number) => value % 2 == 1;
// const getShapeType = (shape: Shape) => 
const filterValue = (valueFilter: ShapeValue) => (shape: Shape) => valueFilter == 'All' ? true : (valueFilter == 'Odd' ? isOdd(shape.value) : !isOdd(shape.value));
const filterShape = (shapeFilter: ShapeType) => (shape: Shape) => shapeFilter == 'All' || shapeFilter == shape.type;