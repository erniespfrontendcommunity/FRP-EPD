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
const getRating = get('rating');
    
// const composeOf2 = (fun1, fun2) => x => fun1(fun2(x));
const compose = (...funcs) => x => funcs.reduce((f1, f2) => f2(f1), x);

// exercise 2
const getTitle = get('title');
const getReleaseDate = get('releaseDate');
const isEqual = value1 => value2 => value1 === value2;
const isEqual2016 = isEqual(2016);
const bookReleaseDateIs2016 = compose(getReleaseDate, isEqual2016);
// const titleReleaseDateIs2016 = compose(bookReleaseDateIs2016, getTitle);

const releaseDateIs2016FromBooks = (books: Book[]) => books.find(bookReleaseDateIs2016);
const titleReleaseDateIs2016FromBooks = compose(releaseDateIs2016FromBooks, getTitle);

// exercise 2: average
// const averageBookRating = (books: Book[]) => 
const fork = (join, func1, func2) => param => join(func1(param), func2(param));
const divide = (a,b) => a/b;
const sum = items => items.reduce((acc, cur) => acc + cur, 0);
const meanSimplified = items => items.reduce((acc, cur) => acc + cur, 0) / items.length;
const averageBookRating = books => compose(getRating, meanSimplified);
const count = items => items.length;
const mean = fork(divide, sum, count);

// ex 3: stars
const writeStars = (number: number) => new Array(number).reduce((acc, cur) => acc + "*", "");
const writeBookStars = (book: Book) => `${book.title}: ${writeStars(book.rating)}`;  
const writeBooksStars = (books: Book[]) => books.forEach(writeBookStars);
const print = value => console.log(value);
const printBookStars = compose(writeBookStars, print);

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

        // Exercise 1
        // books.forEach((book) => console.log(getRating(book)));

        // Exercise 2
        // console.log("title");
        // console.log(titleReleaseDateIs2016FromBooks(books));

        // Exercise 2: average book rating
        // console.log(averageBookRating(books));

        // Ex 3
        // books.map(printBookStars);
        // writeBooksStars(books);
    }

}