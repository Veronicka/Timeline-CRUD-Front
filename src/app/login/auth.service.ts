import { Injectable, EventEmitter } from '@angular/core';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //KEY = 'value';
	private usuarioAutenticado: boolean = false;

	mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, public session: SessionStorageService) { }

  fazerLogin(usuario: Usuario){
  	if(usuario.nome === 'usuario@email.com' && usuario.senha === '123456'){
  		this.usuarioAutenticado = true; 
  		this.mostrarMenuEmitter.emit(true);
  		this.router.navigate(['/']);
  	}
  	else {
  		this.mostrarMenuEmitter.emit(false);
  		this.usuarioAutenticado = false;
  	}
  }

  usuarioEstaAutenticado(){
  	return this.usuarioAutenticado;
  }

  // set(expired: number = 0) {
  //       this.local.set(this.KEY, { a: 1, now: +new Date }, expired, 'n');
  //   }

  // remove() {
  //     this.session.remove(this.KEY);
  // }

  // get() {
  //     this.value = this.session.get(this.KEY);
  // }

  // clear() {
  //     this.session.clear();
  // }
}
