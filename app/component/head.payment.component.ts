import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { PaymentService } from "../service/payment.service";
import { Payment } from "../model/payment.model";

@Component({
	selector: 'head_payment',
	moduleId: module.id,
	templateUrl: '../template/head.payment.component.html',
	directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/head.component.css'],
	providers: []
})

export class HeadPaymentComponent {
	payments:Payment[] = [];

	constructor(private _paymentService:PaymentService) {}

	ngOnInit() {
		this._paymentService.getPayments().then(payments => {
			this.payments = payments;
			payments.sort(function (a, b) {
				var x = a.date;
				var y = b.date;
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			});
		}).catch((err) => this.payments = []);
	}
}
