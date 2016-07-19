///<reference path="serializable.interface.ts"/>
import { Bill } from "./bill.model";
import { Payment } from "./payment.model";

export class User implements Serializable<User> {
	_id:any;
	name:string;
	type:string = "user";
	mobile_no:number;
	address:string;
	tin_no:number;
	money_due:number = 0;
	bills:any[] = [];
	payments:any[] = [];

	deserialize(json) {
		this._id = json._id;
		this.name = json.name;
		this.mobile_no = json.mobile_no;
		this.address = json.address;
		this.tin_no = json.tin_no;
		this.money_due = json.money_due;

		for (let bill of json.bills) {
			if (!(typeof bill == "string"))
				this.bills.push(new Bill().deserialize(bill));
			else
				this.bills.push(bill)
		}

		for (let payment of json.payments) {
			if (!(typeof payment == "string"))
				this.payments.push(new Payment().deserialize(payment));
			else
				this.payments.push(payment);
		}

		return this;
	}
}
