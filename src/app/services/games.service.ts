import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Game} from '../interfaces';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class GamesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Game[]> {
    return this.http.get(`${environment.fbDbUrl}/games.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
          }))
      }))
  }

  getById(id: string): Observable<Game> {
    return this.http.get<Game>(`${environment.fbDbUrl}/games/${id}.json`)
      .pipe(map((game: any) => {
        return {
          ...game, id
        }
      }))
  }

  update(game: Game): Observable<Game> {
    return this.http.patch<Game>(`${environment.fbDbUrl}/games/${game.id}.json`, game);
}
}