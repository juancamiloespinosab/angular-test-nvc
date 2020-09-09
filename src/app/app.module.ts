import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search/search.component';
import { DetailComponent } from './detail/detail/detail.component';
import { SearchBoxComponent } from './search/search-box/search-box.component';
import { MovieCardComponent } from './search/movie-card/movie-card.component';
import { BackBoxComponent } from './detail/back-box/back-box.component';
import { PosterComponent } from './detail/poster/poster.component';
import { SeasonsControllerComponent } from './detail/seasons-controller/seasons-controller.component';
import { EpisodeBoxComponent } from './detail/episode-box/episode-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent,
    SearchBoxComponent,
    MovieCardComponent,
    BackBoxComponent,
    PosterComponent,
    SeasonsControllerComponent,
    EpisodeBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
