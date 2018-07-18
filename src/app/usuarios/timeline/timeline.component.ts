import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import 'hammerjs';
import * as vis from 'vis';
import swal from 'sweetalert2';

import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';
import { LogOperacoesService } from './log-operacoes.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
	private usuarioSelecionado: Usuario;
	private usuarios: any[];
	private items: vis.DataSet;

	day = new Date();
	min = this.day.setHours(0); // 0 horas
  	max = this.day.setHours(23); // 23:59 horas

	constructor(
	  	private route: ActivatedRoute,
	  	private usuariosService: UsuariosService) {
	}

	loadTimeline(data){
		console.log(data);
		var d = [];
		for(var i = 0; i<data.length; i++){
			d.push({id: i,
				   start: new Date(), 
				   content: data[i].nome,
				   email: data[i].email
			});
		}
		return d;
	}
	
	ngOnInit() {
		let container = document.getElementById('visualization');
		this.items = new vis.DataSet();

		this.usuariosService.getUsuarios()
	      .subscribe((users) => {
	        this.usuarios = users;
	        this.items.add(this.loadTimeline(users));
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
		    		html: '<div align="left" style="margin-left: 3em"><p><p><b>Email: </b> '
		    		+item.email+'</p><p><b>Data: </b>'
		    		+item.start+'</p></div>'
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
		
		//this.items = new vis.DataSet(this.loadTimeline(this.usuarios));

		// Configuration for the Timeline
		

	 	// function prettyConfirm(title, text, callback) {
		 //    swal({
		 //      title: title,
		 //      text: text,
		 //      type: 'warning',
		 //      showCancelButton: true,
		 //      confirmButtonColor: "#DD6B55"
		 //   	}).then(() => callback);
	  //   }

	  //   function prettyPrompt(title, text, inputValue, callback) {
		 //    swal({
		 //      title: title,
		 //      text: text,
		 //      type: 'input',
		 //      showCancelButton: true,
		 //      inputValue: inputValue
		 //    }).then(() => callback);
	  //   }

		// Create a Timeline
		new vis.Timeline(container, this.items, options);
	}
}
