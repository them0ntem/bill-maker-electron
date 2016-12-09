import { User } from "../model/user.model";
import { db } from "../db.conn";

export class UserService {
	getUser(id:string):Promise<User> {
		return new Promise(function (resolve, reject) {
			let bills = [], payments = [], user_temp;
			db.find({ _id: id }, function (err, docs) {
				if (err)
					reject(err);
				else {
					user_temp = docs[0];
					db.find({ type: 'bill', _id: { $in: user_temp.bills } }, function (err, docs) {
						if (err)
							reject(err);
						else {
							docs.forEach((doc) => {
								bills.push(doc);
							});


							db.find({ type: 'payment', _id: { $in: user_temp.payments } }, function (err, docs) {
								if (err)
									reject(err);
								else {
									docs.forEach((doc) => {
										payments.push(doc);
									});

									user_temp.bills = bills;
									user_temp.payments = payments;

									resolve(new User().deserialize(user_temp));
								}
							})
						}
					});
				}
			});
		});
	}

	getUsers():Promise < User[] > {
		let users:User[] = [];
		return new Promise(function (resolve, reject) {
			db.find({ type: 'user' }, function (err, docs) {
				if (err)
					reject(err);
				else {
					docs.forEach((doc) => {
						users.push(new User().deserialize(doc))
					});

					resolve(users);
				}
			});
		})
	}

	createUser(user:User):Promise < any > {
		return new Promise(function (resolve, reject) {
			db.insert(user, function (err, newDoc) {
				if (err)
					reject(err);
				else
					resolve(newDoc);
			});

		})
	}

	updateUser(user:User):Promise < any > {
		user = this.compactUser(user);
		return new Promise(function (resolve, reject) {
			db.update({
				type: user.type,
				_id: user._id
			}, user, { returnUpdatedDocs: true }, function (err, numReplaced, affectedDocuments) {
				if (err)
					reject(err);
				else {
					resolve({
						numReplaced: numReplaced,
						affectedDocuments: affectedDocuments
					})
				}
			})
		})
	}

	compactUser(user:User):User {
		let bills_string:string[] = [], payments_string:string[] = [];

		for (let bill of user.bills)
			if (!(typeof bill == "string"))
				bills_string.push(bill._id);

		for (let payment of user.payments)
			if (!(typeof payment == "string"))
				payments_string.push(payment._id);

		user.bills = bills_string;
		user.payments = payments_string;
		return user;
	}
}
