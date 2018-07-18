import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from '../message.service';

import { LogOperacoes } from './log-operacoes';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root'})
export class LogOperacoesService {
	private API_URL: string = "http://localhost:8080/timelinecrud/log/";

	constructor(private http: HttpClient, private messageService: MessageService) { }

	getLogs(): Observable<LogOperacoes[]> {
	    return this.http.get<LogOperacoes[]>(this.API_URL + 'getAll')
		    .pipe(
		      tap(response => this.log('fetched heroes')),
		      catchError(this.handleError('getAll', []))
	    );
  	}

	getLogByUserId(id: number): Observable<LogOperacoes[]> {
		const URL = `${this.API_URL}/getByUserId?id=${id}`;
		return this.http.get<LogOperacoes[]>(URL)
			.pipe(
		      tap(response => this.log('fetched heroes')),
		      catchError(this.handleError('getAll', []))   
	    );
	}

	//////// Save methods //////////

  saveLogOperacoes (logOperacoes: LogOperacoes): Observable<LogOperacoes> {
    return this.http.post<LogOperacoes>(`${this.API_URL}/save`, logOperacoes, HTTP_OPTIONS).pipe(
      tap((logOperacoes: LogOperacoes) => this.log(`added logOperacoes`)),
      catchError(this.handleError<LogOperacoes>('addLogOperacoes'))
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
	  this.messageService.add(`LogOperacoesService: ${message}`);
	}
}
