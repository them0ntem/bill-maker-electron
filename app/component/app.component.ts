import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { UserService } from "../service/user.service";
import { NavComponent } from "./nav.component";
import { BillService } from "../service/bill.service";
import { PaymentService } from "../service/payment.service";
import { ConfigService } from "../service/config.service";

@Component({
	selector: 'my-app',
	moduleId: module.id,
	templateUrl: '../template/app.component.html',
	directives: [NavComponent, ROUTER_DIRECTIVES],
	styleUrls: [],
	providers: [UserService, BillService, PaymentService, ConfigService]
})

export class AppComponent {

	constructor(private userService:UserService){}
	
	ngOnInit():any {

	}
}
