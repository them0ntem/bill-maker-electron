import { User } from "./model/user.model";
import { UserService } from "./service/user.service";
import { BillItem, Bill } from "./model/bill.model";
import { BillService } from "./service/bill.service";
import { ConfigService } from "./service/config.service";
//
// let bill_item = new BillItem();
// bill_item.amount = 200;
// bill_item.description = "Reliable admirals, to the radiation dome.";
// bill_item.particulars = "Particles reproduce on shield at deep space!";
//
// let bill = new Bill();
// bill.bill_items = [
// 	bill_item,
// 	bill_item,
// ];
// bill.date = new Date();
// bill.description = "All hands view.";
// bill.total_amount = 300;

// new UserService().getUsers().then(function (res) {
// 	console.log(res);
//
// 	new BillService().createBill(bill, res[0]).then(function (res) {
// 		console.log(res);
// 	})
// }).catch((err) => {
// 	console.log(err);
// });

// new BillService().getBills().then(function (res) {
// 	new BillService().deleteBill(res[0]).then(function (res) {
// 		console.log(res);
// 	}).catch(function (res) {
// 		console.log(res);
// 	})
// });

// new UserService().getUser("w3bw8GPyrWKqRsqO").then(function (res) {
// 	console.log(res);
// }).catch(function (res) {
// 	console.log(res);
// });

console.log(new ConfigService().billSequenceInc());
