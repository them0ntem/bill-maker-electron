declare var nedb:any;
export var db = new nedb({ filename: './app/collection.data', autoload: true });
// var nedb = require('nedb');
// export var db = new nedb({ filename: './collection.data', autoload: true });
