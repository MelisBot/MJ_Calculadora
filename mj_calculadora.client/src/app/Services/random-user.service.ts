import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomUser } from '../../Models/random-user';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  private apiURL = 'https://randomuser.me/api/'; //APi

  constructor(private http: HttpClient) { } //usando HttpClient

  //obtener usuario recibiendo un total de 10 usuarios en el getAllUsers
  getAllUsers(results: number = 10): Observable<{ results: RandomUser[] }> {
    return this.http.get<{ results: RandomUser[] }>(this.apiURL);
  }
}
