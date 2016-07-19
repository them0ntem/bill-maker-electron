import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FormBuilder, REACTIVE_FORM_DIRECTIVES, FormGroup } from "@angular/forms";
import { Bill } from "../model/bill.model";
import { BillService } from "../service/bill.service";
import { Validators } from "@angular/common";
declare var electron:any;

@Component({
	selector: 'old_bill',
	moduleId: module.id,
	templateUrl: '../template/old.bill.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/old.bill.component.css'],
	providers: [FormBuilder]
})

export class OldBillComponent {
	billFound:boolean = false;
	errorMsg:boolean = false;
	billForm:FormGroup;

	constructor(private _billService:BillService, private _formBuilder:FormBuilder) {
	}

	ngOnInit() {
		this.billForm = this._formBuilder.group({
			index: ['', [Validators.pattern('[0-9]{1,}'), Validators.required]],
		});
	}

	printOldBill() {
		this._billService.getBillIndex(this.billForm.value.index).then((res) => {
			console.log(res);
			electron.ipcRenderer.send('open-bill-print-window', res._id);
			this.errorMsg = false
		}).catch((err)=> {
			if (err.status == -1)
				this.billFound = true;
			this.errorMsg = true;
		});
	}
}
