import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../Models/result';
import { Usuario } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  private apiURL = 'http://localhost:5123/api/Usuario';//URLApI

  constructor(private http: HttpClient) { }

  //GetAll get
  getAll(): Observable<Result> {
    return this.http.get<Result>(this.apiURL);
  }

  //Add post
  add(usuario: Usuario): Observable<Result>{
    return this.http.post<Result>(this.apiURL, usuario);
  }
  //update put/id
  update(idUsuario: number, usuario: Usuario): Observable<Result> {
    return this.http.put<Result>(`${this.apiURL}/${idUsuario}`, usuario);
  }
  //delete /id
  delete(idUsuario: number): Observable<Result> {
    return this.http.delete<Result>(`${this.apiURL}/${idUsuario}`);
  }
  //getbyid get/id
  getbyid(idUsuario: number): Observable<Result> {
    return this.http.get<Result>(`${this.apiURL}/${idUsuario}`);
  }

}
