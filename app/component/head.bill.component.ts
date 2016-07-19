import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { BillService } from "../service/bill.service";
import { Bill } from "../model/bill.model";

@Component({
	selector: 'head_bill',
	moduleId: module.id,
	templateUrl: '../template/head.bill.component.html',
	directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/head.component.css'],
	providers: []
})

export class HeadBillComponent {
	bills:Bill[] = [];

	constructor(private _billService:BillService) {}

	ngOnInit() {
		this._billService.getBills().then(bills => {
			this.bills = bills;
			bills.sort(function (a, b) {
				var x = a.date;
				var y = b.date;
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			});
		}).catch((err) => this.bills = []);
	}
}
