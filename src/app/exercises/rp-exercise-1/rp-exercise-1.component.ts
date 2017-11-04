import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const simulatedRequest = (term: string) => Observable.timer(1000).map(_ => `Search result from -> ${term} request`);

@Component({
    selector:    'rp-exercise-1',
    template: `<h2 class="subtitle">Reactive text input</h2>
    <div class="exercise"><div>
      We want to simulate a request from a input text value:
      <br>
      every time that we write some text, a request must to be triggered, and the response must be shown into the results
      div.
      <br>
      <br>
      <br>
      Steps:
      <br>
      <ul>
        <li>Read the 'keyup' event from the input component</li>
        <li>Get the value from the KeyboardEvent target</li>
        <li>Connect to the request function</li>
        <li>The result have to be placed into the results div</li>
      </ul>
      <hr>
      Extra points:
      <br>
      <ul>
        <li>Insert a threshold time because we don't want do the request every char we type</li>
        <li>After this threshold time, if the search time is the same as before, the resquest won't be triggered</li>
        <li>We only want to do the request if the input has more than 2 chars</li>
      </ul>    <br>
    </div>
      <br>
      <hr>
      <span>Search: <input #input type="text"/></span>
      <br>
      Results:
      <div #results></div>
    </div>`,
    styles: [`
        input {
            margin-bottom: 30px;
        }
    `]
})
export class RPExercise1Component implements AfterViewInit {
    @ViewChild('input') input: ElementRef;
    @ViewChild('results') results: ElementRef;

    ngAfterViewInit() {
    //CODE MUST BE PLACED HERE

    }
}