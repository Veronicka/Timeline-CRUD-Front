import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { AutenticacaoService } from './autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private usuario: Usuario = new Usuario();
	private estaLogado: boolean = false;

  constructor(private autenticacaoService: AutenticacaoService, 
    private router: Router) { }

  ngOnInit() { }

  onSubmit() { 
  	this.autenticacaoService.fazerLogin(this.usuario);
    this.estaLogado = this.autenticacaoService.usuarioEstaAutenticado();
  }

  registrar(){
    this.router.navigate(['/registro']);
  }

}
