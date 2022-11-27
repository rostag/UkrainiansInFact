import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit {

  data = {
    gathered: 23000
  }

  constructor() { }

  ngOnInit(): void {
  }

}
