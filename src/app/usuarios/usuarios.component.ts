import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MaterializeDirective } from 'angular2-materialize'

import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[];
  usuario: Usuario;
  estaSelec: boolean;

  constructor(private usuariosService: UsuariosService, private router: Router) {
  	this.estaSelec = true;
  }

  ngOnInit() {
    this.usuariosService.getUsuarios()
    .subscribe((users) => {
      this.usuarios = users;
    });
  	//this.usuarios = this.usuariosService.getUsuarios();
  }

  novoUsuario(){
  	this.estaSelec = false;
    this.router.navigate(['/usuarios/novo']);
  }

  editarUsuario(){
    this.router.navigate(['/usuarios', this.usuario.id, 'editar']);
  }

  usuarioSelecionado(usuario: Usuario){
    this.estaSelec = false;
  	this.usuario = usuario;
  }

  deletar(usuario: Usuario): void {
    this.usuarios = this.usuarios.filter(u => u !== usuario);
    this.usuariosService.deleteUsuario(usuario).subscribe();
  }
}
