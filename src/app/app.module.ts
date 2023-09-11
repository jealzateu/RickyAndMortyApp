import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './_components/characters/characters.component';
import { LocationsComponent } from './_components/locations/locations.component';
import { EpisodesComponent } from './_components/episodes/episodes.component';
import { CharacterDetailsComponent } from './_components/characters/character-details/character-details.component';
import { LocationDetailsComponent } from './_components/locations/location-details/location-details.component';
import { EpisodeDetailsComponent } from './_components/episodes/episode-details/episode-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    LocationsComponent,
    EpisodesComponent,
    CharacterDetailsComponent,
    LocationDetailsComponent,
    EpisodeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
