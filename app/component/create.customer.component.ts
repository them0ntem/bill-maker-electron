import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { UserService } from "../service/user.service";
import { HeaderComponent } from "./header.component";
import { User } from "../model/user.model";
import { FormBuilder, Validators, FormGroup, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";

@Component({
	selector: 'create_customer',
	moduleId: module.id,
	templateUrl: '../template/create.customer.component.html',
	directives: [HeaderComponent, ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	styleUrls: ['../css/create.customer.component.css'],
	providers: [FormBuilder]
})

export class CreateCustomerComponent {
	user:User = new User();
	formSubmitted = false;
	successfullyCreated = false;
	customerForm:FormGroup;

	constructor(private _formBuilder:FormBuilder, private _userService:UserService) {}

	ngOnInit() {
		this.customerForm = this._formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(10)]],
			mobile_no: ['', Validators.pattern('[789][0-9]{9}')],
			address: ['', Validators.required],
			tin_no: ['', Validators.pattern('[0-9]{12}')]
		});
	}

	newUser() {
		this.user = new User();
	}

	saveUser() {
		this._userService.createUser(this.user).then(() => {
			this.formSubmitted = true;
			this.successfullyCreated = true;
			this.user = new User();
		}).catch(() => {
			this.formSubmitted = true;
			this.successfullyCreated = false;
		})
	}
}
