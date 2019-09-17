// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as cp from 'child_process';

let serverProcess: cp.ChildProcess;
let bokehDir: string;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "bokehpreview" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.bokehPreview', () => {
		// The code you place here will be executed every time your command is executed

		let output = getOutputChannel();
		let activeEditor = vscode.window.activeTextEditor;
		output.appendLine("Examining file...");
		if(!activeEditor){
			output.appendLine("No active editor");
			return;
		}

		let doc = activeEditor.document;
		let start = doc.fileName.length - "main.py".length;
		if(doc.fileName.substring(start) === "main.py"){
			output.appendLine("main.py detected");
			let text = doc.getText();
			let import_bokeh = text.indexOf("from bokeh.io import curdoc") >= 0;
			let add_root = text.indexOf("curdoc().add_root(") >= 0;
			let dir = doc.fileName.substring(0, start);
			if(import_bokeh && add_root){
				startServer(dir);
			}
		}else{
			output.appendLine("Not a bokeh file");
		}
	});

	context.subscriptions.push(disposable);
}

let _bokehDir: string | undefined;
function startServer(dir: string) {
	let output = getOutputChannel();
	output.appendLine("Starting server...");
	_bokehDir = dir;
	if(serverProcess){
		serverProcess.kill();
		return;
	}

	spawnServer();
}

function spawnServer() {
	if(!_bokehDir){
		return;
	}
	
	let output = getOutputChannel();
	let python = getPython();

	let args = [
		"-m",
		"bokeh",
		"serve",
		_bokehDir,
		"--dev"
	];

	_bokehDir = undefined;

	serverProcess = cp.spawn(python, args);

	serverProcess.stdout.on('data', (data) => {
		output.append(`${data}`);
	});
	
	serverProcess.stderr.on('data', (data) => {
		output.append(`${data}`);
	});
	
	serverProcess.on('close', (code) => {
		output.append(`child process exited with code ${code}`);
		spawnServer();
	});
}

function getPython() : string {
	let output = getOutputChannel();
	let pythonConf = vscode.workspace.getConfiguration("python");
	if(!pythonConf){
		output.appendLine("Python not configured, assuming global python");
		return "python";
	}

	let env = pythonConf.get<string>("pythonPath");
	if(!env){
		output.appendLine("No environment found, assuming global python");
		return "python";
	}

	output.appendLine("Using " + env);
	return env;
}

// this method is called when your extension is deactivated
export function deactivate() {
	if(serverProcess){
		serverProcess.kill();
	}
}

let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
	if (!_channel) {
		_channel = vscode.window.createOutputChannel('Bokeh');
	}
	return _channel;
}