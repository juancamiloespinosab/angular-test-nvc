import { Component, OnInit, Input } from '@angular/core';
import * as interfaces from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movieData: interfaces.Movie;

  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit(): void { }

  getImageBackground(movieData: interfaces.Movie) {
    if (movieData.imgBackdropPath == null) {
      if (movieData.imgPosterPath == null) {
        return "url('../../assets/placeholder/movieplaceholder.jpg')"
      } else {
        return `url('https://image.tmdb.org/t/p/w500/${movieData.imgPosterPath}')`
      }
    } else {
      return `url('https://image.tmdb.org/t/p/w500/${movieData.imgBackdropPath}')`
    }

  }

  goToDetail(movieData: interfaces.Movie) {

    if (movieData.type == 'tv') {
      this.router.navigate(
        [{
          outlets:
            { popup: ['detail', movieData.id] }
        }]
      );

    }

  }


}
