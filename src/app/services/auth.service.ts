import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FbAuthResponse, User} from '../interfaces';


@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string {
    const tokenEexpDate = localStorage.getItem('fb-token-exp');
    const token = localStorage.getItem('fb-token');
    if (!tokenEexpDate || !token){
      return null as any;
    }
    const expDate = new Date( tokenEexpDate as string)
    if (new Date() > expDate) {
      this.logout()
      return null as any;
    }
    
    return token;
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response) => this.setToken(response as FbAuthResponse)),
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
