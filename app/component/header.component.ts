import { Component, Input } from "@angular/core";

@Component({
	selector: 'header_jumbotron',
	moduleId: module.id,
	template: `<div class="jumbotron" style="text-align: center;margin-top: -30px;">
	<h2>{{title}}</h2>
</div>`
})

export class HeaderComponent {
	@Input()
	title:string;
}
