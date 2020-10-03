import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){ }

  ngOnInit() {
    // console.log('me here');
    // this.http.post('/api/authenticate', {'username' : 'roy', 'password' : 12}).toPromise()
    //   .then((response) => {
    //     console.log('response ', response);
    //   })
  }
}
