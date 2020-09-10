import { Component, OnInit, Input } from '@angular/core';
import * as interfaces from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-episode-box',
  templateUrl: './episode-box.component.html',
  styleUrls: ['./episode-box.component.css']
})
export class EpisodeBoxComponent implements OnInit {

  @Input() episode: interfaces.Episode;

  constructor() { }

  ngOnInit(): void {
  }

}
