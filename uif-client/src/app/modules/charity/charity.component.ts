import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.css']
})
export class CharityComponent implements OnInit {

  imgData!: string;
  imgDownload!: string;
  downloadReady = false;

  data = {
    gathered: 23000
  }

  constructor() { }

  ngOnInit(): void {}

  copyImage() {
    const imageElement = document.getElementById('image-teaser') as HTMLElement;
    html2canvas(imageElement).then(canvas => {
      this.saveImgFromCanvas(canvas);
    });
    
  }

  saveImgFromCanvas(c: HTMLCanvasElement) {
    var imageData = c.toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    this.imgData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
    this.imgDownload = "image.png";
    this.downloadReady = true;
  }

  invalidate() {
    this.downloadReady = false;
  }

}
