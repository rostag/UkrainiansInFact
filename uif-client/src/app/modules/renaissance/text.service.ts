import { Injectable } from '@angular/core';
import { text as y17 } from './texts/yohansen-17';

export interface IBook {
  author: string;
  source: string;
  content: string;
  linesPerPage: number;
  lines?: IBookLine[];
  pages?: IBookPage[];
}

export interface IBookPage {
  parentBook: IBook;
  lines: IBookLine[];
}

export interface IBookLine {
  book: IBook;
  parentPage?: IBookPage;
  contents: string;
}

@Injectable({
  providedIn: 'root'
})
export class TextService {

  books: IBook[] = [y17];

  constructor() { }

  parseBook(book?: IBook): IBook {
    let b: IBook = book ?? this.books[0];
    const bookLines: IBookLine[] = b.content.split('\n').map(
      (line) => ({
          book: b,
          parentPage: undefined,
          contents: line
      })
    );
    const bookPages: IBookPage[] = [];
    const pageCount = bookLines.length / b.linesPerPage;
    for (let p = 0; p < pageCount; p += 1 ) {
      let line: IBookLine = {
        book: b,
        // parentPage: undefined,
        contents: ''
      }
      bookPages[p] = {
        lines:  bookLines.slice(p, p * b.linesPerPage),
        parentBook: b
      }
    }
    return b!;
  }

  getLine(book: IBook, line: number) {
    const b = this.parseBook(book!);
    return b.lines![line];
  }

  getPage(book: IBook) {
    const b = book ?? this.books[0];
    const linesPerPage = b.linesPerPage;
    // const b
    // for (let i = 0; i < )
  }
}
