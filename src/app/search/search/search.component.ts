import { Component, OnInit } from '@angular/core';
import { ImdbService } from 'src/app/services/imdb.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  page: number;
  totalPages: number;

  searchForm: FormGroup;
  incorrectForm: boolean = false;

  constructor(private imdbService: ImdbService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keywords: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]+')])
      //keywords: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')])
    });
  }

  searchMovies() {
    if (this.searchForm.valid) {
      this.imdbService.getMovies(this.searchForm.controls['keywords'].value, 1, res => {
        console.log(res)
      });
    } else {
      this.incorrectForm = true;
    }

  }

}
