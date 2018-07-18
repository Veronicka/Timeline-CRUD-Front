import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Usuario } from './usuario';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root'})
export class UsuariosService {
	private API_URL: string = "http://localhost:8080/timelinecrud/";

	constructor(private http: HttpClient, private messageService: MessageService) { }

	// private usuarios: any[] = [
	// 	{id: 1, nome: 'Usuario 01', email: 'usuario01@email.com', dataHora: new Date()},
	// 	{id: 2, nome: 'Usuario 02', email: 'usuario02@email.com', dataHora: new Date()},
	// 	{id: 3, nome: 'Usuario 03', email: 'usuario03@email.com', dataHora: new Date()}
	// ];

	getUsuarios(): Observable<Usuario[]> {
	    return this.http.get<Usuario[]>(this.API_URL + 'getAll')
		    .pipe(
		      tap(response => this.log('fetched heroes')),
		      catchError(this.handleError('getAll', []))
	    );
  	}

	getUsuario(id: number): Observable<Usuario> {
		const URL = `${this.API_URL}/getById?id=${id}`;
		return this.http.get<Usuario>(URL).pipe(
		      tap(_ => this.log(`fetched usuario id=${id}`)),
			  catchError(this.handleError<Usuario>(`getById id=${id}`))    
	    );
	}

	//////// Save methods //////////

	/** POST: add a new usuario to the server */
  saveUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}/save`, usuario, HTTP_OPTIONS).pipe(
      tap((usuario: Usuario) => this.log(`added usuario`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  /** DELETE: delete the usuario from the server */
  deleteUsuario (usuario: Usuario | number): Observable<Usuario> {
    const ID = typeof usuario === 'number' ? usuario : usuario.id;

    return this.http.post<Usuario>(`${this.API_URL}/delete`, ID, HTTP_OPTIONS).pipe(
      tap(_ => this.log(`deleted usuario id=${ID}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  /** PUT: update the usuario on the server */
  updateHero (usuario: Usuario): Observable<any> {
    return this.http.put(`${this.API_URL}/save`, usuario, HTTP_OPTIONS).pipe(
      tap(_ => this.log(`updated usuario id=${usuario.id}`)),
      catchError(this.handleError<any>('updateUsuario'))
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
