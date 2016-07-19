import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import { ConfigService } from "../service/config.service";

@Component({
	selector: 'head_payment',
	moduleId: module.id,
	templateUrl: '../template/head.settings.component.html',
	directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/head.component.css'],
	providers: []
})

export class HeadSettingComponent {
	bill:number;
	payment:number;
	company:any;

	constructor(private _configService:ConfigService) { }

	ngOnInit() {
		this.bill = this._configService.billSequence;
		this.payment = this._configService.paymentSequence;
		this.company = this._configService.companyDetail;
	}

	saveCompanyDetail() {
		this._configService.companyDetail = this.company;
	}
}
