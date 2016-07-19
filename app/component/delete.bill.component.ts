import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES, FormGroup } from "@angular/forms";
import { Bill } from "../model/bill.model";
import { BillService } from "../service/bill.service";
import { Validators } from "@angular/common";
declare var electron:any;

@Component({
	selector: 'delete_bill',
	moduleId: module.id,
	templateUrl: '../template/delete.bill.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/delete.bill.component.css'],
	providers: [FormBuilder]
})

export class DeleteBillComponent {
	billFound:boolean = false;
	errorMsg:boolean = false;
	billDeleted:boolean = false;
	billForm:FormGroup;

	constructor(private _billService:BillService, private _formBuilder:FormBuilder) { }

	ngOnInit() {
		this.billForm = this._formBuilder.group({
			index: ['', [Validators.pattern('[0-9]{1,}'), Validators.required]],
		});
	}

	deleteBill() {
		this._billService.deleteBillIndex(this.billForm.value.index).then((res) => {
			this.errorMsg = false;
			this.billDeleted = true;
		}).catch((err)=> {
			this.billFound = err.status == -1;
			this.errorMsg = true;
			this.billDeleted = false;
		});
	}
}
