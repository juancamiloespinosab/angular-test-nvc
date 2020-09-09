import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as interfaces from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  private API_URL: string = 'https://api.themoviedb.org/3';
  private API_KEY: string = 'b2907782d07859a652052d3bae537475';
  private movieListLimit: number = 9;
  private actorListLimit: number = 3;

  constructor(private http: HttpClient) { }

  getMovies(searchData: interfaces.SearchData, moviesResponse: any) {
    const uri: string = `${this.API_URL}/search/multi?api_key=${this.API_KEY}&query=${this.replaceSpaces(searchData.keywords)}&page=${searchData.page}&language=es`;

    this.httpRequest(uri, httpResponse => {
      let response: interfaces.Response;

      if (httpResponse.ok) {
        let resultsLength: number = httpResponse.data.results.length;
        let movieList: interfaces.Movie[] = [];
        this.movieListLimit = 9;
        searchData = {
          keywords: searchData.keywords,
          page: httpResponse.data.page,
          totalPages: httpResponse.data.total_pages
        }

        if (resultsLength > 0) {

          for (let i = 0; i < this.movieListLimit; i++) {

            if (httpResponse.data.results[i].media_type != 'person') {
              let movie: interfaces.Movie = {
                id: httpResponse.data.results[i].id,
                title: httpResponse.data.results[i].original_name || httpResponse.data.results[i].original_title,
                imgPosterPath: httpResponse.data.results[i].poster_path,
                imgBackdropPath: httpResponse.data.results[i].backdrop_path || httpResponse.data.results[i].poster_path,
                type: httpResponse.data.results[i].media_type,
                rating: httpResponse.data.results[i].vote_average
              }

              movieList.push(this.getActors(movie));

            } else {
              this.movieListLimit++;
            }

            if (i + 1 == resultsLength) break;

          }

          response = {
            ok: true,
            data: movieList,
            searchData: searchData
          }
        } else {
          response = {
            ok: false,
            data: 'La busqueda no arrojo resultados.'
          }
        }
      } else {
        response = {
          ok: false,
          data: 'Ha ocurrido un error en la consulta.'
        }
      }

      moviesResponse(response);
    });
  }

  getActors(movieData: interfaces.Movie): interfaces.Movie {
    const uri: string = `${this.API_URL}/${movieData.type}/${movieData.id}/credits?api_key=${this.API_KEY}`;

    this.httpRequest(uri, httpResponse => {
      if (httpResponse.ok) {
        let castLength: number = httpResponse.data.cast.length;
        let actorList: interfaces.Actor[] = [];
        movieData.actors = [];

        if (castLength > 0) {

          for (let i = 0; i < this.actorListLimit; i++) {
            let actor: interfaces.Actor = {
              name: httpResponse.data.cast[i].name
            }

            actorList.push(actor);

            if (i + 1 == castLength) break;
          }

          movieData.actors = actorList;
        }

      }


    });

    return movieData;
  }

  private httpRequest(uri: string, httpResponse: any) {

    let res: interfaces.Response;

    this.http.get(uri)
      .subscribe(dataResponse => {
        res = {
          ok: true,
          data: dataResponse
        }
        httpResponse(res);
      }, () => {
        res = {
          ok: false,
          data: null
        }
        httpResponse(res);
      });
  }

  private replaceSpaces(words) {
    return words.replace(' ', '+');
  }

}
