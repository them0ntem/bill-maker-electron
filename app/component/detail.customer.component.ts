import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { UserService } from "../service/user.service";
import { HeaderComponent } from "./header.component";
import { User } from "../model/user.model";
import { FormBuilder, Validators, FormGroup, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";

@Component({
	selector: 'detail_customer',
	moduleId: module.id,
	templateUrl: '../template/detail.customer.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/detail.customer.component.css'],
	providers: [FormBuilder]
})

export class DetailCustomerComponent {
	user:User = new User();
	users:User[] = [];
	formSubmitted:boolean = false;
	errorMsg:boolean = false;
	customerForm:FormGroup;
	selectUser:number;

	constructor(private _formBuilder:FormBuilder, private _userService:UserService) {}

	ngOnInit() {
		this.selectUser = -1;
		this._userService.getUsers()
			.then(users => this.users = users)
			.catch((err) => this.errorMsg = true);

		this.customerForm = this._formBuilder.group({
			selectUser: [''],
			name: ['', Validators.required],
			mobile_no: ['', Validators.pattern('[789][0-9]{9}')],
			address: ['', Validators.required],
			tin_no: ['', Validators.pattern('[0-9]{12}')]
		});
	}

	updateField(val) {
		this._userService.getUser(this.users[val]._id)
			.then(res => this.user = res)
			.catch(err => this.errorMsg = true);
	}

	updateUser() {
		this._userService.updateUser(this.user).then(() => {
			this.formSubmitted = true;
		}).catch(() => {
			this.formSubmitted = true;
			this.errorMsg = true;
		})
	}
}
