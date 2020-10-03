import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserInfo: {};

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    const userData = localStorage.getItem('userInfo');
    return !!(userData && JSON.parse(userData));
  }

  public setUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post('/api/authenticate', {'username': email, 'password': password}).toPromise();
  }
}
