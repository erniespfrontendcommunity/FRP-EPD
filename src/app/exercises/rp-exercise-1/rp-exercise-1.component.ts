import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const simulatedRequest = (term: string) => Observable.of(1000).map(_ => `Search result from -> ${term} request`);

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
      console.clear()

      // observer emmiting values every second
      Observable.interval(500)
        .filter(multiple5)
        .map(x => new Date().getSeconds())
        // .throttleTime(2000)
        // .subscribe(console.log);

        simulatedRequest("my search string")
        // .subscribe(console.log)

        exercise1.main(this.input, this.results);
        // BackPressureExercise.main();
    }
}

namespace exercise1 {
  export const main = (input: ElementRef, results: ElementRef) => {
    let i = 0;
    Observable.fromEvent(input.nativeElement, 'keyup')
      // .scan((acc, cur) => acc + cur)
      .debounceTime(1000)
      .map(x => input.nativeElement.value)
      .filter(x => x.length > 5)
      .distinctUntilChanged()
      .switchMap(x => simulatedRequest(i++ + " " + x))
      .subscribe(x => {
        console.log(x)
        results.nativeElement.innerText = x;
      })
  }

}

namespace BackPressureExercise {
  export const main = () => {
    let ob1 = Observable.interval(5)
    // .bufferCount(1000)
    // .bufferTime(1000)
    .debounceTime(1000)
    // .subscribe(console.log);
    let ob2 = Observable.interval(10)
    .throttleTime(500)
    .map(x => "ob2")

    ob1.merge(ob2)
      .subscribe(console.log)
  }

}

const multiple5 = x => x % 5 === 0;
