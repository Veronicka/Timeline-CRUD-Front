import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
	private usuario: Usuario = new Usuario();

  constructor(
  	private route: ActivatedRoute,
  	private usuariosService: UsuariosService, 
    private router: Router) { }

  ngOnInit() {
  }

  voltar(): void {
    this.router.navigate(['/login']);
  }

  salvar(): void {
    this.usuariosService.saveUsuario(this.usuario)
      .subscribe((ok) => {
        if(ok) alert("Usuario registrado.");
        else alert("Erro ao registrar usuario.");
        this.voltar()
     });
  }

}
