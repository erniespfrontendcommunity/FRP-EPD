import { Component, OnInit } from '@angular/core';

interface Book {
    id: number;
    title: string;
    author: string;
    rating: number;
    releaseDate: number;
}

const books: Array<Book> = [ { id: 1, title: "C# 6.0", author: "Andrew Troelsen", rating: 8, releaseDate: 1998},
    { id: 2, title: "Machine Learning", author: "Rahul Khanna", rating: 6, releaseDate: 2016},
    { id: 3, title: "Pro Angular 2", author: "Adam Freeman", rating: 4, releaseDate: 2015},
    { id: 4, title: "Pro ASP.NET", author: "Adam Freeman", rating: 2, releaseDate: 2001} ];



const get = prop => x => x[prop];

const rating = get('rating');


///////////////////////////

const compose = (...fncs) => x => fncs.reduce((y, f) => f(y), x);

const title = get('title');

const releasedIn2016 = (books: Array<Book>) => books.find(b => b.releaseDate === 2016);

const titleReleasedIn2016 = compose(releasedIn2016, title);

/////////////////////////////

//const fork = (join, func1, func2) => param => join(func1(param), func2(param));

//const divide = (a, b) => a / b;

const mean = books => books.reduce((acc, cur) => acc + cur.rating, 0) / books.length;

//const count = items => items.length;

//const mean = fork(divide, sum, count);

/////////////////////////////////////

const repeat = initial => funct => times => times > 0 ? repeat(funct(initial))(funct)(times - 1) : initial;

const stars = repeat('')(_ => _ + '*');



@Component({
    selector: 'fp-introduction',
    template: `<h2 class="subtitle">Function Concepts</h2>
    <div class="exercise">
      Given this data source:<div [innerHtml]="data"></div>

      Do the following exercises:
      <ul>
        <ol>
          <h3>Pure functions and currying</h3>
          <div>Create a function to get the rating of a book</div>
        </ol>

        <ol>
          <h3>Function composition</h3>
          <div>Get the title of the book released in 2016</div>
          <div>Get the average book rating</div>
        </ol>

        <ol>
          <h3>High order functions</h3>
          <div>Code a function that paints as many starts as rating value of a book</div>
          <div>Apply to all books</div>
        </ol>
      </ul>
    </div>`,
    styles: [`
        ol div::before {
            content: "- ";
        }
    `]
})
export class FpIntroductionComponent implements OnInit {

    data = `<pre><code>
books: Array<Book> = [ { id: 1, title: "C# 6.0", author: "Andrew Troelsen", rating: 8, releaseDate: 1998},
                       { id: 2, title: "Machine Learning", author: "Rahul Khanna", rating: 6, releaseDate: 2016},
                       { id: 3, title: "Pro Angular 2", author: "Adam Freeman", rating: 4, releaseDate: 2015},
                       { id: 4, title: "Pro ASP.NET", author: "Adam Freeman", rating: 2, releaseDate: 2001} ];
</code></pre>`;

    ngOnInit() {
        console.clear();


        //console.log(rating(books[1]));

        console.log(titleReleasedIn2016(books));

        console.log(mean(books));


        console.log(stars(books[0].rating));

        console.log(books.map(book => book.title + ': ' + stars(book.rating)));
    }
}