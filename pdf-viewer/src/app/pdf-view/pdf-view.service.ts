import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfViewService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  getPage = (id): Observable<ArrayBuffer> => this.http.get(`${this.apiUrl}/pdf/${id}`, {responseType: 'arraybuffer'});

  getNrOfPages = (): Observable<{ status, data }> => {
    return this.http.get<{ status, data }>(`${this.apiUrl}/pdf/nrPages`);
  };
}
