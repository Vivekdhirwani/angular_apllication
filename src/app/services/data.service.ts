import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../const';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataStream: Observable<string[]>

  constructor(
    private http: HttpClient
  ) { 
    this.dataStream = new Observable()
   }

   fetchData(input: string): Observable<any> {
     return this.http.get(`${API_URL}/${input}`, {
       observe:'response'
     })
   }
}
