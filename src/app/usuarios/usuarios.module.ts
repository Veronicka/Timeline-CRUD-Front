import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterializeDirective } from 'angular2-materialize';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuariosRoutingModule } from './usuarios.routing.module';
import { UsuariosService } from './usuarios.service';
import { LogOperacoesService } from './timeline/log-operacoes.service';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		UsuariosRoutingModule
	],
	declarations: [
		MaterializeDirective,
		UsuariosComponent,
		UsuarioFormComponent,
		TimelineComponent
	],
	providers: [UsuariosService, LogOperacoesService],
	exports: [MaterializeDirective]
})
export class UsuariosModule {}