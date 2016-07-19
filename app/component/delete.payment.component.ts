import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES, FormGroup } from "@angular/forms";
import { Payment } from "../model/payment.model";
import { PaymentService } from "../service/payment.service";
import { Validators } from "@angular/common";
declare var electron:any;

@Component({
	selector: 'delete_payment',
	moduleId: module.id,
	templateUrl: '../template/delete.payment.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/delete.payment.component.css'],
	providers: [FormBuilder]
})

export class DeletePaymentComponent {
	paymentFound:boolean = false;
	errorMsg:boolean = false;
	paymentDeleted:boolean = false;
	paymentForm:FormGroup;

	constructor(private _paymentService:PaymentService, private _formBuilder:FormBuilder) { }

	ngOnInit() {
		this.paymentForm = this._formBuilder.group({
			payment_index: ['', [Validators.pattern('[0-9]{1,}'), Validators.required]],
		});
	}

	deletePayment() {
		this._paymentService.deletePaymentIndex(this.paymentForm.value.payment_index).then((res) => {
			this.errorMsg = false;
			this.paymentDeleted = true;
		}).catch((err)=> {
			this.paymentFound = err.status == -1;
			this.errorMsg = true;
			this.paymentDeleted = false;
		});
	}
}
