import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImdbService } from 'src/app/services/imdb.service';
import * as interfaces from 'src/app/interfaces/interfaces';
import { UtilService } from 'src/app/services/util.service';
import { SeasonsControllerComponent } from '../seasons-controller/seasons-controller.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  movieId: number;
  detail: interfaces.Detail;
  actualSeasonNumber: number;
  actualSeasonNumberArray: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private imdbService: ImdbService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params.id;
    this.getDetail();
    this.utilService.deactivateGeneralScroll();
  }

  getDetail() {
    this.imdbService.getDetail(this.movieId, res => {
      if (res.ok) {
        this.detail = res.data;
        this.actualSeasonNumber = this.detail.seasons[0].number;
        this.setSeasonNumberArray();
      }
    })
  }

  goBack() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.utilService.activeGeneralScroll();
  }

  showEpisodes(seasonNumber) {
    this.actualSeasonNumber = seasonNumber;
    this.setSeasonNumberArray();

  }

  setSeasonNumberArray() {
    for (let i = 0; i < this.detail.seasons.length; i++) {
      if (this.detail.seasons[i].number == this.actualSeasonNumber) {
        this.actualSeasonNumberArray = i;
      }
    }
  }


}
