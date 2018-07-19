import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AutenticacaoService } from '../login/autenticacao.service';

@Injectable( )
export class AuthGuard implements CanActivate {

  constructor(
  	private authService: AutenticacaoService,
  	private router: Router
  ) { }

  canActivate(
  	route: ActivatedRouteSnapshot, 
  	state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

  	if(sessionStorage.getItem('currentUser')){
  		return true;
  	} 

  	 this.router.navigate(['/login']);
  	return false;
  }
}
