import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EpisodeResponse } from 'src/app/_interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(url?: string): Observable<EpisodeResponse> {
    const apiUrl = url || this.apiUrl;
    return this.http.get<EpisodeResponse>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('An error occurred:', error.error.message);
    } else {
      // El servidor devolvió un código de error.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Devuelve un observable con un mensaje de error para que el componente lo maneje.
    return throwError('Something went wrong; please try again later.');
  }
}
