import { Component, OnInit } from '@angular/core';
import { ImdbService } from 'src/app/services/imdb.service';
import * as interfaces from 'src/app/interfaces/interfaces';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchData: interfaces.SearchData;
  moviesList: interfaces.Movie[] = [];
  loading: boolean = false;
  statusMessage: string = null;

  constructor(private imdbService: ImdbService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.searchData = {
      keywords: '',
      page: 1,
      totalPages: 1
    }
    this.statusMessage = '¡Bienvenido!';
    this.utilService.activeGeneralScroll();
  }

  searchMovies(searchData: interfaces.SearchData) {
    this.loading = true;
    this.statusMessage = null;

    if (searchData.keywords != this.searchData.keywords) {
      this.moviesList = []
    }

    this.imdbService.getMovies(searchData, res => {

      if (res.ok) {
        this.searchData = res.searchData;
        res.data.forEach(element => {
          this.moviesList.push(element)
        });
      } else {
        this.statusMessage = res.data;
      }

      this.loading = false;

    });
  }


  onScroll() {
    if (this.searchData.page < this.searchData.totalPages) {
      this.searchData.page++;
      this.searchMovies(this.searchData)
    } else {
      this.loading = false;
      this.statusMessage = 'Has llegado al final!';

    }
  }

}
