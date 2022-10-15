import { Component, OnInit } from '@angular/core';
import { TextService } from './text.service';

@Component({
  selector: 'app-renaissance',
  templateUrl: './renaissance.component.html',
  styleUrls: ['./renaissance.component.css']
})
export class RenaissanceComponent implements OnInit {

  constructor(protected textService: TextService) { }

  result = '';

  ngOnInit(): void {
    this.render();
  }

  render () {
    const lines = this.textService.parseBook();
    this.result = this.textService.getLine(undefined, 1);    
    console.log('lines:', lines[0]);
    console.log('res:', this.result); 
  }

}
