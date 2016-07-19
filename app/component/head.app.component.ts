import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
declare var electron:any;

@Component({
	selector: 'create_customer',
	moduleId: module.id,
	templateUrl: '../template/head.app.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/head.app.component.css'],
	providers: []
})

export class HeadAppComponent {
	ngOnInit(){
		// new PouchDB('./data').info().then((res) => {
		// 		console.log(res);
		// 	});
	}

}
