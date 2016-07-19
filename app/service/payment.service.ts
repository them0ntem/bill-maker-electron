import { Payment } from "../model/payment.model";
import { db } from "../db.conn";
import { User } from "../model/user.model";
import { ConfigService } from "./config.service";

export class PaymentService {
	getPayments():Promise<Payment[]> {
		let payments:Payment[] = [];
		return new Promise(function (resolve, reject) {
			db.find({ type: 'payment' }, function (err, payments_res) {
				if (err)
					reject(err);
				else {
					payments_res.forEach((payment) => {
						payments.push(new Payment().deserialize(payment))
					});

					resolve(payments);
				}
			});
		})
	}

	getPayment(id:string):Promise<Payment> {
		return new Promise(function (resolve, reject) {
			db.find({ type: 'payment', _id: id }, function (err, payment_res) {
				if (err)
					reject(err);
				else {
					resolve(new Payment().deserialize(payment_res[0]));
				}
			});
		})
	}

	getPaymentIndex(id:string):Promise<Payment> {
		let payment:Payment = new Payment();
		return new Promise(function (resolve, reject) {
			db.find({ type: 'payment', index: +id }, function (err, payment_res) {
				if (err)
					reject(err);
				else if (payment_res.length == 0)
					reject({ msg: "Payment not found", status: -1 });
				else
					new PaymentService().getPayment(payment_res[0]._id).then((res) => {
						resolve(res);
					})
			});
		})
	}

	createPayment(payment:Payment, user:User):Promise<any> {
		payment.customer_id = user._id;
		payment.index = new ConfigService().paymentSequenceInc();
		return new Promise(function (resolve, reject) {
			db.insert(payment, function (err, payment_res) {
				if (err)
					reject(err);
				else {
					db.update({
						type: user.type,
						_id: user._id
					}, {
						$push: { payments: payment_res._id },
						$inc: { money_due: (0 - payment.amount_received) },
					}, { returnUpdatedDocs: true }, function (err, numReplaced, affectedDocuments) {
						if (err)
							reject(err);
						else {
							resolve(payment_res);
						}
					})
				}
			});
		});
	};


	deletePaymentIndex(id:string):Promise<Payment> {
		let payment:Payment = new Payment();
		return new Promise(function (resolve, reject) {
			db.find({ type: 'payment', index: +id }, function (err, payment_res) {
				if (err)
					reject(err);
				else if (payment_res.length == 0)
					reject({ msg: "Payment not found", status: -1 });
				else
					new PaymentService().deletePayment(payment.deserialize(payment_res[0])).then((res) => {
						resolve(res);
					})
			});
		})
	}

	deletePayment(payment:Payment):Promise<any> {
		return new Promise(function (resolve, reject) {
			db.remove({ _id: payment._id }, {}, function (err, numRemoved) {
				if (err)
					reject(err);
				else {
					db.update({
						type: 'user',
						_id: payment.customer_id
					}, {
						$pull: { payments: payment._id },
						$inc: { money_due: payment.amount_received },
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
