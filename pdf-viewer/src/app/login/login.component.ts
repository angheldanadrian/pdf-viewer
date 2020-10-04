import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userEmail: string;
  userPassword: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login = (): void => {
    this.authService.validate(this.userEmail, this.userPassword)
      .then((response: { user }) => {
        this.authService.setUserInfo({user: response.user});
        this.router.navigate(['pdf-view']);

      });
  };

}
