import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { User } from "../model/user.model";
import { Bill, BillItem } from "../model/bill.model";
import { BillService } from "../service/bill.service";
import { UserService } from "../service/user.service";
declare var electron:any;
declare var fs:any;


@Component({
	selector: 'create_bill',
	moduleId: module.id,
	templateUrl: '../template/create.bill.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/create.bill.component.css'],
	providers: [FormBuilder]
})

export class CreateBillComponent {
	user:User = new User();
	users:User[] = [];
	bill:Bill = new Bill();
	formSubmitted:boolean = false;
	errorMsg:boolean = false;
	selectUser:number;
	active:boolean = true;

	constructor(private _billService:BillService, private _userService:UserService) {
	}

	ngOnInit() {
		this.addRow("Professional service rendered in connection with", 200, "");

		this.totalAmount();
		this.selectUser = -1;
		this._userService.getUsers()
			.then(users => {
				this.users = users;
			})
			.catch(err => this.errorMsg = true);
	}

	addRow(particulars:string = "", amount:number = 0, description:string = "") {
		let bill_item = new BillItem();
		bill_item.particulars = particulars;
		bill_item.description = description;
		bill_item.amount = amount;
		this.bill.bill_items.push(bill_item);
	}

	updateField(val) {
		this.user = this.users[val];
	}

	totalAmount() {
		var totalAmount = 0;
		this.bill.bill_items.forEach(bill_item => totalAmount += +bill_item.amount);
		this.bill.total_amount = totalAmount;
	}

	saveBill() {
		this.active = false;
		if (this.user._id != undefined) {
			this._billService.createBill(this.bill, this.user).then((res) => {
				this.formSubmitted = true;
				this.bill = new Bill();
				this.user = new User();
				this.ngOnInit();
				this.active = true;
				this.errorMsg = false;
				electron.ipcRenderer.send('open-bill-print-window', res._id);
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
		return JSON.stringify(this.bill);
	}
}
