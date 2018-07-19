import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from '../message.service';
import { Usuario } from './usuario';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API_URL: string = "http://localhost:8080/timelinecrud/login";
  
  constructor(private http: HttpClient, 
      private messageService: MessageService) { }

  /** POST: login a usuario to the server */
  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}`, usuario, HTTP_OPTIONS).pipe(
      tap(response => this.log('logged user')),
      catchError(this.handleError<any>('not logged Usuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UsuarioService: ${message}`);
  }
}
