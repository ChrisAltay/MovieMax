import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'cb22b1ab5e2d123baedc0c3c1b04112d';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMoviesByGenre(genreId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }
}
