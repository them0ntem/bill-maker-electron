import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { User } from "../model/user.model";
import { Bill, BillItem } from "../model/bill.model";
import { BillService } from "../service/bill.service";
import { UserService } from "../service/user.service";
import {DatePipe} from "@angular/common";

declare var electron:any;
declare var fs:any;


@Component({
	selector: 'edit_bill',
	moduleId: module.id,
	templateUrl: '../template/edit.bill.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/edit.bill.component.css'],
	providers: [FormBuilder]
})

export class EditBillComponent {
	user:User = new User();
	bill:Bill = new Bill();
	old_bill:Bill = new Bill();
	formSubmitted:boolean = false;
	errorMsg:boolean = false;
	active:boolean = true;
	bill_index:number;

	constructor(private _billService:BillService, private _userService:UserService) {
	}

	ngOnInit() {

	}

	addRow(particulars:string = "", amount:number = 0, description:string = "") {
		let bill_item = new BillItem();
		bill_item.particulars = particulars;
		bill_item.description = description;
		bill_item.amount = amount;
		this.bill.bill_items.push(bill_item);
	}

	updateField(val) {
		this._billService.getBillIndex(val)
			.then(bill => {
				this.errorMsg = false;
				this.bill = bill;
				this.old_bill = <Bill> JSON.parse(JSON.stringify(bill));
				this.bill.date = new DatePipe().transform(this.bill.date, 'yyyy-MM-dd');
				this._userService.getUser(this.bill.customer_id).then(user => {
					this.user = user;
				})
			})
			.catch(err => {
				this.errorMsg = true;
				console.log(err);
			});
	}

	totalAmount() {
		var totalAmount = 0;
		this.bill.bill_items.forEach(bill_item => totalAmount += +bill_item.amount);
		this.bill.total_amount = totalAmount;
	}

	saveBill() {
		this.active = false;
		if (this.user._id != undefined) {
			this._billService.updateBill(this.old_bill, this.bill, this.user).then((res) => {
				this.formSubmitted = true;
				this.bill = new Bill();
				this.old_bill = new Bill();
				this.user = new User();
				this.active = true;
				this.errorMsg = false;
				console.log(res.affectedDocuments._id);
				electron.ipcRenderer.send('open-bill-print-window', res.affectedDocuments._id, false);
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
