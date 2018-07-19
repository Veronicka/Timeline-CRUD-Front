import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';

const APP_ROUTES: Routes = [
	{ 
		path: 'usuarios', 
		loadChildren: '../app/usuarios/usuarios.module#UsuariosModule', 
		canActivate: [AuthGuard]
	},
	{ 
		path: 'login', 
		component: LoginComponent 
	},
	{ 
		path: 'registro', 
		component: RegistroComponent
	},
	{ 
		path: '', 
		component: HomeComponent, 
		canActivate: [AuthGuard] 
	}
];

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES)],
	exports: [RouterModule]
})
export class AppRoutingModule { }