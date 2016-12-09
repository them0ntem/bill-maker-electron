import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { User } from "../model/user.model";
import { Payment } from "../model/payment.model";
import { PaymentService } from "../service/payment.service";
import { UserService } from "../service/user.service";
import {DatePipe} from "@angular/common";

declare var electron:any;
declare var fs:any;


@Component({
	selector: 'edit_payment',
	moduleId: module.id,
	templateUrl: '../template/edit.payment.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/edit.payment.component.css'],
	providers: [FormBuilder]
})

export class EditPaymentComponent {
	user:User = new User();
	payment:Payment = new Payment();
	old_payment:Payment = new Payment();
	formSubmitted:boolean = false;
	errorMsg:boolean = false;
	active:boolean = true;
	payment_index:number;

	constructor(private _paymentService:PaymentService, private _userService:UserService) {}

	ngOnInit() {

	}

	updateField(val) {
		this._paymentService.getPaymentIndex(val)
			.then(payment => {
				this.errorMsg = false;
				this.payment = payment;
				this.old_payment = <Payment> JSON.parse(JSON.stringify(payment));
				this.payment.date = new DatePipe().transform(this.payment.date, 'yyyy-MM-dd');
				this._userService.getUser(this.payment.customer_id).then(user => {
					this.user = user;
				})
			})
			.catch(err => {
				this.errorMsg = true;
				console.log(err);
			});
	}

	savePayment() {
		this.active = false;
		if (this.user._id != undefined) {
			console.log(this.user);
			this._paymentService.updatePayment(this.old_payment, this.payment, this.user).then((res) => {
				this.formSubmitted = true;
				this.payment = new Payment();
				this.old_payment = new Payment();
				this.user = new User();
				this.active = true;
				this.errorMsg = false;
				console.log(this.user);
				electron.ipcRenderer.send('open-payment-print-window', res.affectedDocuments._id, false);
			}).catch((err) => {
				this.errorMsg = true;
				this.active = true;
			})
		} else {
			this.active = true;
			this.errorMsg = true;
		}
	}

	get diagnostic() {
		return JSON.stringify(this.payment);
	}
}
