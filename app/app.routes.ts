import { provideRouter, RouterConfig } from "@angular/router";
import { CreateCustomerComponent } from "./component/create.customer.component";
import { EditCustomerComponent } from "./component/edit.customer.component";
import { DetailCustomerComponent } from "./component/detail.customer.component";
import { CreateBillComponent } from "./component/create.bill.component";
import { PrintBillComponent } from "./component/bill.print.component";
import { OldBillComponent } from "./component/old.bill.component";
import { DeleteBillComponent } from "./component/delete.bill.component";
import { CreatePaymentComponent } from "./component/create.payment.component";
import { PrintPaymentComponent } from "./component/payment.print.component";
import { OldPaymentComponent } from "./component/old.payment.component";
import { DeletePaymentComponent } from "./component/delete.payment.component";
import { HeadCustomerComponent } from "./component/head.customer.component";
import { HeadBillComponent } from "./component/head.bill.component";
import { HeadAppComponent } from "./component/head.app.component";
import { HeadPaymentComponent } from "./component/head.payment.component";
import { HeadSettingComponent } from "./component/head.settings.component";
import {EditBillComponent} from "./component/edit.bill.component";
import {EditPaymentComponent} from "./component/edit.payment.component";

const routes = [
	{
		path: 'menu/head',
		component: HeadAppComponent
	}, {
		path: 'customer/head',
		component: HeadCustomerComponent
	}, {
		path: 'customer/create',
		component: CreateCustomerComponent
	}, {
		path: 'customer/edit',
		component: EditCustomerComponent
	}, {
		path: 'customer/detail',
		component: DetailCustomerComponent
	}, {
		path: 'bill/head',
		component: HeadBillComponent
	}, {
		path: 'bill/create',
		component: CreateBillComponent
	}, {
		path: 'bill/edit',
		component: EditBillComponent
	}, {
		path: 'bill/old',
		component: OldBillComponent
	}, {
		path: 'bill/delete',
		component: DeleteBillComponent
	}, {
		path: 'bill/print/:id/:duplicate',
		component: PrintBillComponent
	}, {
		path: 'payment/create',
		component: CreatePaymentComponent
	}, {
		path: 'payment/head',
		component: HeadPaymentComponent
	}, {
		path: 'payment/old',
		component: OldPaymentComponent
	}, {
		path: 'payment/edit',
		component: EditPaymentComponent
	}, {
		path: 'payment/delete',
		component: DeletePaymentComponent
	}, {
		path: 'payment/print/:id/:duplicate',
		component: PrintPaymentComponent
	}, {
		path: 'settings/head',
		component: HeadSettingComponent
	}, {
		path: '',
		redirectTo: 'menu/head',
		terminal: true
	}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
