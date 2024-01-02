import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) { }

  getSentiment() {
      return this.http.get<any>('assets/sentimentdata.json')
          .toPromise()
          .then(res => <any[]>res.data)
          .then(data => { return data; });
  }
}
