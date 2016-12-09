import {isDev} from "./isDev";
declare let nedb: any;

let db_path: string;

if (isDev)
    db_path = `./app/collection.data`;
else
    db_path = `${process.resourcesPath}/data/collection.data`;

export let db = new nedb({filename: db_path, autoload: true});
