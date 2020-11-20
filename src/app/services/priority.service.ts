import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private apiURL = 'https://utn-lubnan-api-3.herokuapp.com/api/Priority'

  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(this.apiURL)
      .toPromise();
  }
}
