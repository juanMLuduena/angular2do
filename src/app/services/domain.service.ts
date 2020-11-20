import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiURL = 'https://utn-lubnan-api-3.herokuapp.com/api/Domain'

  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(this.apiURL)
      .toPromise();
  }

  getByName(name: string): Promise<any>{
    return this.http.get(this.apiURL + '/' + name)
      .toPromise();
  }
}
