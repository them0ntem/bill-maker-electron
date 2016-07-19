///<reference path="serializable.interface.ts"/>
export class Payment implements Serializable<Payment> {
	_id:any;
	_rev:string;
	index:number;
	type:string = "payment";
	amount_received:number;
	method:string;
	description:string = "";
	customer_id:string;
	date:Date;

	deserialize(json) {
		this._id = json._id;
		this._rev = json._rev;
		this.amount_received = json.amount_received;
		this.method = json.method;
		this.description = json.description;
		this.date = new Date(json.date);
		this.customer_id = json.customer_id;
		this.index = json.index;
		return this;
	}
}
