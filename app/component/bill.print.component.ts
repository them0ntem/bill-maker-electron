import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { User } from "../model/user.model";
import { Bill } from "../model/bill.model";
import { BillService } from "../service/bill.service";
import { UserService } from "../service/user.service";
import { toWords } from "../toWords.pipe";
import { ConfigService } from "../service/config.service";
declare var electron:any;

@Component({
	selector: 'print_bill',
	moduleId: module.id,
	templateUrl: '../template/bill.print.component.html',
	directives: [ROUTER_DIRECTIVES],
	styleUrls: ['../css/bill.print.component.css'],
	providers: [],
	pipes: [toWords]
})

export class PrintBillComponent {
	user:User = new User();
	bill:Bill = new Bill();
	company;
	errorMsg:boolean = false;
	navigated:boolean = false;
	duplicate:boolean = true;
	sub:any;

	constructor(private _billService:BillService, private _userService:UserService, private _configService:ConfigService, private _route:ActivatedRoute) { }

	ngOnInit() {
		this.company = this._configService.companyDetail;
		this.sub = this._route.params.subscribe(params => {
			if (params['id'] !== undefined && params['duplicate'] !== undefined) {
				this.duplicate = params['duplicate'] == "true";
				let id:string = params['id'];
				this._billService.getBill(id).then((bill) => {
					this.bill = bill;
					this._userService.getUser(bill.customer_id).then(user => {
						this.user = user;
						electron.ipcRenderer.send('bill-print');
					}).catch(err => this.errorMsg = true);
				});
			} else {
				this.errorMsg = true;
				this.user = new User();
			}
		});
	}

	ngAfterContentInit() {
		$('my-app>div').removeAttr("style");
		$('my-app>navbar').remove();
	}

	printBtn() {
		electron.ipcRenderer.send('bill-print');
	}
}
