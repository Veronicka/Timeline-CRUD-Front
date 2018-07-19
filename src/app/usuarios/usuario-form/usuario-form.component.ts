import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  @Input() usuario: Usuario;

  func: string;

  constructor(
  	private route: ActivatedRoute,
  	private usuariosService: UsuariosService, 
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.pathFromRoot[2].snapshot.url[0].path);
    if(this.route.pathFromRoot[2].snapshot.url[0].path === 'novo'){
      this.func = "Novo";
      this.usuario = new Usuario();
      this.usuario = {
        id: 0,
        nome: '',
        email: '',
        senha: '',
        telefone: ''
      };
    }else{
      this.func = "Editar";
      this.getUsuario();
    }
  }

  getUsuario(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }

  voltar(): void {
    this.router.navigate(['/usuarios']);
  }

  salvar(): void {
    console.log(this.usuario);
    this.usuariosService.saveUsuario(this.usuario)
      .subscribe(() => this.voltar());
  }

}
