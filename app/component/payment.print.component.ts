import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { User } from "../model/user.model";
import { Payment } from "../model/payment.model";
import { UserService } from "../service/user.service";
import { toWords } from "../toWords.pipe";
import { PaymentService } from "../service/payment.service";
declare var electron:any;

@Component({
	selector: 'print_payment',
	moduleId: module.id,
	templateUrl: '../template/payment.print.component.html',
	directives: [ROUTER_DIRECTIVES],
	styleUrls: ['../css/payment.print.component.css'],
	providers: [],
	pipes: [toWords]
})

export class PrintPaymentComponent {
	user:User = new User();
	payment:Payment = new Payment();
	errorMsg:boolean = false;
	navigated:boolean = false;
	sub:any;

	constructor(private _paymentService:PaymentService, private _userService:UserService, private _route:ActivatedRoute) { }

	ngOnInit() {
		this.sub = this._route.params.subscribe(params => {
			if (params['id'] !== undefined) {
				let id:string = params['id'];
				this._paymentService.getPayment(id).then((payment) => {
					this.payment = payment;
					return this._userService.getUser(payment.customer_id);
				}).then(user => {
					this.user = user;
					electron.ipcRenderer.send('payment-print');
				}).catch(err => {
					this.errorMsg = true
				});
			} else {
				this.errorMsg = true;
				this.user = new User();
			}
		});
	}

	ngAfterContentInit() {
		$('my-app>div').removeAttr("style");
		$('my-app>navbar').remove();
	}

	printBtn() {
		electron.ipcRenderer.send('payment-print');
	}

	get currentDate() {
		return new Date();
	}
}
