import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { TimelineComponent } from './timeline/timeline.component';

const ALUNOS_ROUTES: Routes = [
	{path: '', component: UsuariosComponent},
	{path: 'timeline', component: TimelineComponent},
	{path: 'novo', component: UsuarioFormComponent},
	{path: ':id/editar', component: UsuarioFormComponent}
];

@NgModule({
	imports: [RouterModule.forChild(ALUNOS_ROUTES)],
	exports: [RouterModule],
})
export class UsuariosRoutingModule {}