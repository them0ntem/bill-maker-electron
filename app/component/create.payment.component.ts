import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES, FormGroup } from "@angular/forms";
import { User } from "../model/user.model";
import { UserService } from "../service/user.service";
import { Payment } from "../model/payment.model";
import { Validators } from "@angular/common";
import { PaymentService } from "../service/payment.service";
declare var electron:any;
declare var fs:any;


@Component({
	selector: 'create_payment',
	moduleId: module.id,
	templateUrl: '../template/create.payment.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/edit.payment.component.css'],
	providers: [FormBuilder]
})

export class CreatePaymentComponent {
	user:User = new User();
	users:User[] = [];
	payment:Payment = new Payment();
	formSubmitted:boolean = false;
	errorMsg:boolean = false;
	selectUser:number;
	active:boolean = true;
	paymentForm:FormGroup;

	constructor(private _userService:UserService,
	            private _paymentService:PaymentService,
	            private _formBuilder:FormBuilder) {}

	ngOnInit() {
		this.paymentForm = this._formBuilder.group({
			selectUser: [''],
			amount_received: ['', [Validators.required, Validators.pattern('[0-9]{1,}')]],
			method: ['cash', Validators.required],
			description: ['', Validators.required],
			date: [new Date().toDateString(), Validators.required],
		});
		
		this.selectUser = -1;
		this._userService.getUsers()
			.then(users => {
				this.users = users;
			})
			.catch(err => this.errorMsg = true);
	}

	updateField(val) {
		this.user = this.users[val];
	}

	saveBill() {
		this.active = false;
		if (this.user._id != undefined) {
			this._paymentService.createPayment(this.payment, this.user).then((res) => {
				this.formSubmitted = true;
				this.payment = new Payment();
				this.user = new User();
				this.ngOnInit();
				this.active = true;
				this.errorMsg = false;
				electron.ipcRenderer.send('open-payment-print-window', res._id, false);
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
