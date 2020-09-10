import { Component, OnInit, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import * as interfaces from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-seasons-controller',
  templateUrl: './seasons-controller.component.html',
  styleUrls: ['./seasons-controller.component.css']
})
export class SeasonsControllerComponent implements OnInit {

  @Input() seasons: interfaces.Season[];
  @Output() showEpisodesEvent = new EventEmitter<number>();

  actualSeasonNumber: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.actualSeasonNumber = this.seasons[0].number;
    this.onShowEpisodes();
  }

  changeSeason(boxContainer) {
    let clickedBox = boxContainer.target;

    if (clickedBox.id) {
      let seasonNumberClicked = clickedBox.id;

      if (seasonNumberClicked != this.actualSeasonNumber) {
        this.actualSeasonNumber = seasonNumberClicked;

        this.onShowEpisodes();
      }
    }


  }

  onShowEpisodes() {
    this.showEpisodesEvent.emit(this.actualSeasonNumber);
  }

}
