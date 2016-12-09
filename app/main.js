"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./component/app.component');
var app_routes_1 = require('./app.routes');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var isDev_1 = require("./isDev");
if (isDev_1.isDev)
    core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.APP_ROUTER_PROVIDERS,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map