///<reference path="serializable.interface.ts"/>
export class BillItem implements Serializable<BillItem> {
	particulars:string;
	amount:number;
	description:string;

	deserialize(json) {
		this.particulars = json.particulars;
		this.amount = json.amount;
		this.description = json.description;

		return this;
	}
}

export class Bill implements Serializable<Bill> {
	_id:any;
	_rev:string;
	index:number;
	type:string = "bill";
	bill_items:BillItem[] = [];
	total_amount:number;
	description:string;
	customer_id:string;
	date:Date;

	deserialize(json) {
		this._id = json._id;
		this.index = json.index;
		this.description = json.description;
		this.total_amount = json.total_amount;
		this.customer_id = json.customer_id;
		this.date = new Date(json.date);
		for (let bill_item of json.bill_items) {
			this.bill_items.push(new BillItem().deserialize(bill_item))
		}

		return this;
	}
}
