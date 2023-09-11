import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Character, CharacterResponse } from 'src/app/_interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(url?: string): Observable<CharacterResponse> {
    const apiUrl = url || this.apiUrl;
    return this.http.get<CharacterResponse>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getMultipleCharacters(url?: string): Observable<Character[]> {
    const apiUrl = this.apiUrl + '/' + url || this.apiUrl;
    return this.http.get<Character[]>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getSingleCharacters(url?: string): Observable<Character> {
    const apiUrl = this.apiUrl + '/' + url || this.apiUrl;
    return this.http.get<Character>(apiUrl).pipe(
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
