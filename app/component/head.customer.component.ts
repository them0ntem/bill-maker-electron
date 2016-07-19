import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { User } from "../model/user.model";
import { UserService } from "../service/user.service";

@Component({
	selector: 'head_customer',
	moduleId: module.id,
	templateUrl: '../template/head.customer.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/head.component.css'],
	providers: [FormBuilder]
})

export class HeadCustomerComponent {
	customers:User[] = [];

	constructor(private _userService:UserService) {}
	ngOnInit() {
		this._userService.getUsers().then(customers => {
			this.customers = customers;
			customers.sort(function (a, b) {
				var x = a.money_due;
				var y = b.money_due;
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}).catch((err) => this.customers = []);
	}
}
