import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES, FormGroup } from "@angular/forms";
import { Validators } from "@angular/common";
import { PaymentService } from "../service/payment.service";
declare var electron:any;

@Component({
	selector: 'old_payment',
	moduleId: module.id,
	templateUrl: '../template/old.payment.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/old.payment.component.css'],
	providers: [FormBuilder]
})

export class OldPaymentComponent {
	paymentFound:boolean = false;
	errorMsg:boolean = false;
	paymentForm:FormGroup;

	constructor(private _paymentService:PaymentService, private _formBuilder:FormBuilder) {
	}

	ngOnInit() {
		this.paymentForm = this._formBuilder.group({
			payment_index: ['', [Validators.pattern('[0-9]{1,}'), Validators.required]],
		});
	}

	printOldPayment() {
		this._paymentService.getPaymentIndex(this.paymentForm.value.payment_index).then((res) => {
			electron.ipcRenderer.send('open-payment-print-window', res._id);
			this.errorMsg = false
		}).catch((err)=> {
			if (err.status == -1)
				this.paymentFound = true;
			this.errorMsg = true;
		});
	}
}
