import { Injectable } from '@angular/core';
import { text as y17 } from './texts/yohansen-17';

export interface IBook {
  author: string;
  source: string;
  content: string;
  linesPerPage: number;
  pages?: IBookPage[];
}

export interface IBookPage {
  parentBook: IBook;
  lines: IBookLine;
}

export interface IBookLine {
  book: IBook;
  parentPage: IBookPage;
  contents: string;
}

@Injectable({
  providedIn: 'root'
})
export class TextService {

  books: IBook[] = [y17];

  constructor() { }

  parseBook(book?: IBook): string[] {
    let t = book ?? this.books[0];
    const lines = t.content.split('\n');
    return lines;
  }

  getLine(text?: IBook, line?: number) {
    const t = this.parseBook(text!);
    return t[line!] || '';
  }

  getPage(book: IBook) {
    const b = book ?? this.books[0];
    const linesPerPage = b.linesPerPage;
    // const b
    // for (let i = 0; i < )
  }
}
