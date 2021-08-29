import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Friend } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }
 
  getByIdFriend(id: string): Observable<Friend> {
      return this.http.get<Friend>(`${environment.fbDbUrl}/friends/${id}.json`)
          .pipe(
              map((friend: Friend) => {
                  return {
                      ...friend, id
                  };
              }));
  }

  updateFriend(friend: Friend): Observable<Friend> {
      return this.http.patch<Friend>(`${environment.fbDbUrl}/friends/${friend.id}.json`, friend);
  }

  getAllFriends(): Observable<Friend[]> {
      return this.http.get(`${environment.fbDbUrl}/friends.json`)
          .pipe(map((response: {[key: string]: any}) => {
              return Object.keys(response)
                  .map(key => ({
                      ...response[key],
                      id: key
                  }));
          }));
  }
}
