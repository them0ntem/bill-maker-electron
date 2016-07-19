import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { UserService } from "../service/user.service";

@Component({
	selector: 'navbar',
	moduleId: module.id,
	templateUrl: '../template/nav.component.html',
	directives: [ROUTER_DIRECTIVES],
	styleUrls: ['../css/nav.component.css'],
	providers: []
})

export class NavComponent {
	tab = 0;
	main_tab = {
		0: {
			name: "menu",
			icon: "glyphicon glyphicon-menu-hamburger",
			sub_tab: []
		},
		1: {
			name: "customer",
			icon: "glyphicon glyphicon-user",
			sub_tab: [{
				name: "create",
				icon: "glyphicon glyphicon-plus"
			}, {
				name: "edit",
				icon: "glyphicon glyphicon-edit"
			}, {
				name: "detail",
				icon: "glyphicon glyphicon-list-alt"
			}]
		},
		2: {
			name: "bill",
			icon: "glyphicon glyphicon-book",
			sub_tab: [{
				name: "create",
				icon: "glyphicon glyphicon-plus"
			}, {
				name: "old",
				icon: "glyphicon glyphicon-print"
			},
				{
					name: "delete",
					icon: "glyphicon glyphicon-trash"
				}]
		},
		3: {
			name: "payment",
			icon: "glyphicon glyphicon-credit-card",
			sub_tab: [{
				name: "create",
				icon: "glyphicon glyphicon-plus"
			}, {
				name: "old",
				icon: "glyphicon glyphicon-print"
			},
				{
					name: "delete",
					icon: "glyphicon glyphicon-trash"
				}]
		},
		4: {
			name: "settings",
			icon: "glyphicon glyphicon-cog",
			sub_tab: []
		}
	};
	
	selectMainTab(setTab:number) {
		this.tab = setTab;
	};

	isSelectedMain(checkTab:number) {
		return this.tab === checkTab;
	};

	get fillerHeight() {
		return this.tab * 61 + 61;
	};

	get subTab() {
		return this.main_tab[this.tab].sub_tab;
	}

	get tabName() {
		return this.main_tab[this.tab].name.toLowerCase()
	}

	get mainTab() {
		return $.map(this.main_tab, function (elem) { return elem });
	}
}
