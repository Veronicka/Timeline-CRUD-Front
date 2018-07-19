import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {

	constructor(private router: Router, private authService: AuthService){}

	usuarioLogado: any;
	private usuarioAutenticado: boolean = false;
	mostrarMenuEmitter = new EventEmitter<boolean>();

	fazerLogin(usuario: Usuario) {  
		this.authService.login(usuario)
	      .subscribe((response) => {
	        if(response){
	        	this.usuarioAutenticado = true;
	        	this.mostrarMenuEmitter.emit(true);
	        	sessionStorage.setItem('currentUser', JSON.stringify(response));
	        	this.router.navigate(['/']);
	        }else{
	        	this.mostrarMenuEmitter.emit(false);
	  			this.usuarioAutenticado = false;
	  			alert("email e/ou senha incorretos.");
	        }
	    });
  	}

  logout() {
	sessionStorage.removeItem('currentUser');
	sessionStorage.clear();
	this.mostrarMenuEmitter.emit(false);
	this.router.navigate(['/login']);
  }

  usuarioEstaAutenticado(){
  	return this.usuarioAutenticado;
  }

}