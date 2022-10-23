import { Component, OnInit } from '@angular/core';
import { IBook, TextService } from './text.service';

@Component({
  selector: 'app-renaissance',
  templateUrl: './renaissance.component.html',
  styleUrls: ['./renaissance.component.css']
})
export class RenaissanceComponent implements OnInit {

  // TODO
  // Implement 'Planner' - to distribute audio among narrators
  // Narrators I want:
  // Persons of UIF
  // TickTockers of UC / GU
  // Olga Sytnik, because of voice
  // Veronika Chygrina, because of idea
  // Maria Tercia
  // Maria Kozyrenko
  // Olesya Ostapenko
  // 
  // Volunteering ones
  // Texts:
  // Renaissance:
  // https://uk.wikisource.org/wiki/17_%D1%85%D0%B2%D0%B8%D0%BB%D0%B8%D0%BD/%D0%A1%D1%96%D0%BC%D0%BD%D0%B0%D1%86%D1%8F%D1%82%D1%8C_%D1%85%D0%B2%D0%B8%D0%BB%D0%B8%D0%BD
  // Modern Authors (Сліди на дорозі, Козиренко etc)
  // 

  constructor(protected textService: TextService) { }

  page = 0;
  line = 0;

  result = '';

  ngOnInit(): void {
    this.render();
  }

  render () {
    const book: IBook = this.textService.parseBook();
    // const lines = this.textService.getLine(undefined, 1);    
    // console.log('lines:', lines[0]);
    // console.log('res:', this.result); 
  }

}
