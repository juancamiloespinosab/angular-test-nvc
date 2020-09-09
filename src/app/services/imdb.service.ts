import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as interfaces from 'src/app/interfaces/interfaces';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {

  private API_URL: string = 'https://api.themoviedb.org/3';
  private API_KEY: string = 'b2907782d07859a652052d3bae537475';
  private movieListLimit: number = 9;
  private actorListLimit: number = 3;

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getMovies(searchData: interfaces.SearchData, moviesResponse: any) {
    const uri: string = `${this.API_URL}/search/multi?api_key=${this.API_KEY}&query=${this.utilService.replaceSpaces(searchData.keywords)}&page=${searchData.page}&language=es`;

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

  private getActors(movieData: interfaces.Movie): interfaces.Movie {
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

  getDetail(movieId: number, detailResponse: any) {
    const uri: string = `${this.API_URL}/tv/${movieId}?api_key=${this.API_KEY}&language=es`;
    let response: interfaces.Response;

    this.httpRequest(uri, httpResponse => {
      if (httpResponse.ok) {
        let seasonsLength: number = httpResponse.data.seasons.length;
        let seasonsList: interfaces.Season[];

        let detail: interfaces.Detail = {
          id: httpResponse.data.id,
          title: httpResponse.data.original_name,
          imgPosterPath: httpResponse.data.poster_path || httpResponse.data.backdrop_path,
          overview: httpResponse.data.overview,
          seasons: this.getSeasons(httpResponse.data.id, httpResponse.data.seasons)
        }

        response = {
          ok: true,
          data: detail
        }

        detailResponse(response);
      } else {
        response = {
          ok: false,
          data: 'Ha ocurrido un error al consultar el detalle de la serie'
        }
      }
    });


  }

  private getSeasons(movieId: number, seasons: any[]): interfaces.Season[] {
    let seasonsList: interfaces.Season[] = [];

    seasons.forEach(season => {
      let tmpSeason: interfaces.Season = {
        number: season.season_number,
        episodes: this.getEpisodes(movieId, season.season_number)
      }

      seasonsList.push(tmpSeason);

    });

    return seasonsList;
  }

  private getEpisodes(movieId, seasonNumber): interfaces.Episode[] {
    const uri: string = `${this.API_URL}/tv/${movieId}/season/${seasonNumber}?api_key=${this.API_KEY}&language=es`;

    let episodesList: interfaces.Episode[] = [];

    this.httpRequest(uri, httpResponse => {
      if (httpResponse.ok) {
        httpResponse.data.episodes.forEach(episode => {
          let tmpEpisode: interfaces.Episode = {
            number: episode.episode_number,
            name: episode.name
          }
          episodesList.push(tmpEpisode);
        });

      }
    })

    return episodesList;
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



}
