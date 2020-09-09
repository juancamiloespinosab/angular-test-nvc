import { Component, OnInit, Input } from '@angular/core';
import * as interfaces from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {

  @Input() detail: interfaces.Detail;

  constructor() { }

  ngOnInit(): void {
  }

  getImageBackground() {
    return `url('https://image.tmdb.org/t/p/w500/${this.detail.imgPosterPath}')`;

  }

}
