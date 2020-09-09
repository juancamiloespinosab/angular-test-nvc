import { Component, OnInit } from '@angular/core';
import { ImdbService } from 'src/app/services/imdb.service';
import * as interfaces from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchData;
  moviesList = [];

  constructor(private imdbService: ImdbService, private router: Router) { }

  ngOnInit(): void {
    this.searchData = {
      keywords: '',
      page: 1,
      totalPages: 1
    }

  }

  searchMovies(searchData: interfaces.SearchData) {

    this.imdbService.getMovies(searchData, res => {
      console.log(res.data)
      if (res.ok) {
        this.searchData = res.searchData;
        res.data.forEach(element => {
          this.moviesList.push(element)
        });
      }


    });
  }


  onScroll() {
    if (this.searchData.page < this.searchData.totalPages) {
      this.searchData.page++;
      this.searchMovies(this.searchData)
    } else {
      console.log('No more lines. Finish page!');
    }
  }

  goToDetail() {
    this.router.navigate([{outlets: { popup: 'detail/21'}}]);
  }

}
