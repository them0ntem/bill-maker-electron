"use strict";
var electron = require('electron');
var fs = require('fs');
var mainWindow, printWindow;

function createWindow() {
	mainWindow = new electron.BrowserWindow({
		width: 1024,
		height: 768,
		resizable: false
	});
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	// mainWindow.webContents.openDevTools();
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		electron.app.quit();
	}
});

electron.app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

electron.ipcMain.on('open-bill-print-window', function (event, arg) {
	if (printWindow) {
		return;
	}
	printWindow = new electron.BrowserWindow({
		height: 800,
		width: 850,
		resizable: false
	});
	printWindow.loadURL("file://" + __dirname + "/index.html#/bill/print/" + arg);
	printWindow.on('closed', function () {
		printWindow = null;
	});
});

electron.ipcMain.on('bill-print', function (event, arg) {
	if (!printWindow) {
		return;
	}
	printWindow.webContents.print();
});

electron.ipcMain.on('open-payment-print-window', function (event, arg) {
	if (printWindow) {
		return;
	}
	printWindow = new electron.BrowserWindow({
		height: 800,
		width: 850,
		resizable: false,
	});
	printWindow.loadURL("file://" + __dirname + "/index.html#/payment/print/" + arg);
	printWindow.on('closed', function () {
		printWindow = null;
	});
});

electron.ipcMain.on('payment-print', function (event, arg) {
	if (!printWindow) {
		return;
	}
	printWindow.webContents.print();
});
