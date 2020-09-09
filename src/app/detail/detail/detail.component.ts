import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImdbService } from 'src/app/services/imdb.service';
import * as interfaces from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  movieId: number;
  detail: interfaces.Detail;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private imdbService: ImdbService) { }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params.id;
    this.getDetail();
    this.toggleGeneralScroll();
  }

  getDetail() {
    this.imdbService.getDetail(this.movieId, res => {
      if (res.ok) {
        this.detail = res.data;
      }
    })
  }

  goBack() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.toggleGeneralScroll();
  }

  toggleGeneralScroll() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.toggle('body-disabled-scroll');
  }

}
