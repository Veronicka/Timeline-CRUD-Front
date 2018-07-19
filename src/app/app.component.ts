import { Component } from '@angular/core';
import { AutenticacaoService } from './login/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TimelineCrud';

  mostrarMenu: boolean = false;
  image: string;

  constructor(private authService: AutenticacaoService){
    this.image = './assets/images/logoJusttoLight.png';
  }

  ngOnInit(){
  	this.authService.mostrarMenuEmitter.subscribe(
  		mostrar => this.mostrarMenu = mostrar
  	);
  }

  fazerLogout(){
    console.log("logout");
    this.authService.logout();
  }
}
