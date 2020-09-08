import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as interfaces from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'b2907782d07859a652052d3bae537475';

  constructor(private http: HttpClient) { }

  getMovies(keywords, page, moviesResponse) {
    const uri = `${this.API_URL}/search/multi?api_key=${this.API_KEY}&query=${this.replaceSpaces(keywords)}&page=${page}`;

    this.httpRequest(uri, httpResponse => {
      let response: interfaces.Response;

      if (httpResponse.ok) {
        let resultsLength = httpResponse.data.results.length;
        let movieList: interfaces.Movie[] = [];

        if (resultsLength > 0) {

          for (let i = 0; i < 9; i++) {
            let movie: interfaces.Movie = {
              id: httpResponse.data.results[i].id,
              title: httpResponse.data.results[i].original_name || httpResponse.data.results[i].original_title,
              imgPath: httpResponse.data.results[i].poster_path,
              type: httpResponse.data.results[i].media_type,
              rating: httpResponse.data.results[i].vote_count
            }

            this.getActors(movie, actorsResponse => {
              movieList.push(actorsResponse)
            });

            if (i + 1 == resultsLength) break;
          }

          response = {
            ok: true,
            data: movieList
          }
          moviesResponse(response);
        } else {
          response = {
            ok: false,
            data: 'La busqueda no arrojo resultados.'
          }
          moviesResponse(response);
        }
      } else {
        response = {
          ok: false,
          data: 'Ha ocurrido un error en la consulta.'
        }
        moviesResponse(response);
      }

    });
  }

  getActors(movieData, actorsResponse) {
    const uri = `${this.API_URL}/${movieData.type}/${movieData.id}/credits?api_key=${this.API_KEY}`;

    this.httpRequest(uri, httpResponse => {
      if (httpResponse.ok) {
        let castLength = httpResponse.data.cast.length;
        let actorList: interfaces.Actor[] = [];
        movieData.actors = [];

        if (castLength > 0) {

          for (let i = 0; i < 3; i++) {
            let actor: interfaces.Actor = {
              name: httpResponse.data.cast[i].name
            }

            actorList.push(actor);

            if (i + 1 == castLength) break;
          }

          movieData.actors = actorList;
        }

      }

      actorsResponse(movieData)

    });

  }

  private httpRequest(uri, httpResponse) {

    let res: interfaces.Response;

    this.http.get(uri)
      .subscribe(dataResponse => {
        res = {
          ok: true,
          data: dataResponse
        }
        httpResponse(res);
      }, error => {
        res = {
          ok: false,
          data: error
        }
        httpResponse(res);
      });
  }

  private replaceSpaces(words) {
    return words.replace(' ', '+');
  }

}
