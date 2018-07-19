import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MaterializeDirective } from 'angular2-materialize';

import 'hammerjs';
import * as vis from 'vis';
import swal from 'sweetalert2';

import { Usuario } from '../usuario';
import { LogOperacoes } from './log-operacoes';
import { UsuariosService } from '../usuarios.service';
import { LogOperacoesService } from './log-operacoes.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
	usuarioSelecionado: any;
	usuario: Usuario;
	usuarios: any[];
	logsOp: LogOperacoes[];
	items: vis.DataSet;
	
	day = new Date();
	min = this.day.setHours(0); // 0 horas
  	max = this.day.setHours(23); // 23:59 horas

	constructor(
	  	private route: ActivatedRoute,
	  	private usuariosService: UsuariosService,
	  	private logOperacoesService: LogOperacoesService) { }

	loadTimeline(data){
		var d = [];
		for(var i = 0; i<data.length; i++){
			d.push({id: data[i].id,
				   start: data[i].dataHora, 
				   content: this.usuario.nome+" "+data[i].detalhe,
				   nome: this.usuario.nome,
				   email: this.usuario.email,
				   telefone: this.usuario.telefone
			});
		}
		return d;
	}

	onChange(value){
		this.items.clear();
		if(value !== null){
			this.usuario = value;
			this.logOperacoesService.getLogByUserId(this.usuario.id)
		      .subscribe((logs) => {
		        this.logsOp = logs;
		        this.items.add(this.loadTimeline(logs));
		    });
	  	}
	}
	
	ngOnInit() {
		let container = document.getElementById('visualization');
		this.items = new vis.DataSet();

		this.usuariosService.getUsuarios()
	      .subscribe((users) => {
	        this.usuarios = users;
	    });

	    let options = {
			showCurrentTime: true,
			horizontalScroll: true,
		    start: this.min,
			end: this.max,
			locales:{
				'pt-br':{
					current: 'atual',
					time: 'hora'
				}
			},
			locale: 'pt-br',
			orientation: 'top',
		    editable: {
			    add: true,         // add new items by double tapping
			    updateTime: true,  // drag items horizontally
			    updateGroup: false, // drag items from one group to another
			    remove: false,       // delete an item by tapping the delete button top right
			    overrideItems: false  // allow these options to override item.editable
			  },
			  onAdd: function (item, callback) {
				swal('error', 'Não é possível mover item')
				.then(()=>{
		    		callback(null)
		    	});
		    },
		    onMove: function (item, callback) {
				swal('error', 'Não é possível mover item')
				.then(()=>{
		    		callback(null)
		    	});
		    },
		    onUpdate: function (item, callback) {
		    	swal({
		    		title: item.content,
		    		html: '<div align="left" style="margin-left: 3em"><p><p><b>Nome: </b> '
		    		+item.nome+'</p><p><b>Email: </b>'
		    		+item.email+'</p><p><b>Telefone: </b>'
		    		+item.telefone+'</p><p><b>Data/Hora: </b>'
		    		+new Date(item.start)+'</p></div>'
		    	}).then((ok)=>{
		    		if (ok) {
			          callback(item); // send back adjusted item
			        }
			        else {
			          callback(null); // cancel updating the item
			        }
		    	});
		    }
		};
		
		new vis.Timeline(container, this.items, options);
	}
}
