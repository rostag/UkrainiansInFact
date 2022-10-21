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
  // Olga Sytnik, because of voice
  // Veronika Chygrina, because of idea
  // Volunteering ones

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
