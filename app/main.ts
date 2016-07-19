import { bootstrap }      from '@angular/platform-browser-dynamic';

import { AppComponent }         from './component/app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { HashLocationStrategy, LocationStrategy, FORM_PROVIDERS } from "@angular/common";
import { provideForms, disableDeprecatedForms } from "@angular/forms";


bootstrap(AppComponent, [
	APP_ROUTER_PROVIDERS,
	disableDeprecatedForms(),
	provideForms(),
	{ provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch((err: any) => console.error(err));
