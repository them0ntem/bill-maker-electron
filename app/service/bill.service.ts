import { Bill } from "../model/bill.model";
import { db } from "../db.conn";
import { User } from "../model/user.model";
import { ConfigService } from "./config.service";

export class BillService {
	getBills():Promise<Bill[]> {
		let bills:Bill[] = [];
		return new Promise(function (resolve, reject) {
			db.find({ type: 'bill' }, function (err, bils_res) {
				if (err)
					reject(err);
				else {
					bils_res.forEach((bill) => {
						bills.push(new Bill().deserialize(bill))
					});

					resolve(bills);
				}
			});
		})
	}

	getBill(id:string):Promise<Bill> {
		return new Promise(function (resolve, reject) {
			db.find({ type: 'bill', _id: id }, function (err, bill_res) {
				if (err)
					reject(err);
				else {
					resolve(new Bill().deserialize(bill_res[0]));
				}
			});
		})
	}

	getBillIndex(id:string):Promise<Bill> {
		let bill:Bill = new Bill();
		return new Promise(function (resolve, reject) {
			db.find({ type: 'bill', index: +id }, function (err, bill_res) {
				if (err)
					reject(err);
				else if (bill_res.length == 0)
					reject({ msg: "Bill not found", status: -1 });
				else
					new BillService().getBill(bill_res[0]._id).then((res) => {
						resolve(res);
					})
			});
		})
	}

	createBill(bill:Bill, user:User):Promise<any> {
		bill.customer_id = user._id;
		bill.index = new ConfigService().billSequenceInc();
		console.log(bill.index);
		return new Promise(function (resolve, reject) {
			db.insert(bill, function (err, bill_res) {
				if (err)
					reject(err);
				else {
					db.update({
						type: user.type,
						_id: user._id
					}, {
						$push: { bills: bill_res._id },
						$inc: { money_due: bill_res.total_amount },
					}, {}, function (err, numReplaced) {
						if (err)
							reject(err);
						resolve(bill_res);
					})
				}
			});
		});
	};


	deleteBillIndex(id:string):Promise<Bill> {
		let bill:Bill = new Bill();
		return new Promise(function (resolve, reject) {
			db.find({ type: 'bill', index: +id }, function (err, bill_res) {
				if (err)
					reject(err);
				else if (bill_res.length == 0)
					reject({ msg: "Bill not found", status: -1 });
				else
					new BillService().deleteBill(bill.deserialize(bill_res[0])).then((res) => {
						resolve(res);
					})
			});
		})
	}

	deleteBill(bill:Bill):Promise<any> {
		return new Promise(function (resolve, reject) {
			db.remove({ _id: bill._id }, {}, function (err, numRemoved) {
				if (err)
					reject(err);
				else {
					db.update({
						type: 'user',
						_id: bill.customer_id
					}, {
						$pull: { bills: bill._id },
						$inc: { money_due: (0-bill.total_amount) },
					}, { returnUpdatedDocs: true }, function (err, numReplaced, affectedDocuments) {
						if (err)
							reject(err);
						resolve(affectedDocuments);
					})
				}
			});
		});
	}
}
