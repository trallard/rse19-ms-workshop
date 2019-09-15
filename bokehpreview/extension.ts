// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as cp from 'child_process';

let serverProcess: cp.ChildProcess;

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
				output.appendLine("Starting server...");
				let pythonConf = vscode.workspace.getConfiguration("python");
				if(!pythonConf){
					output.appendLine("Python not configured");
					return;
				}

				let command = pythonConf.get<string>("pythonPath");
				if(!command){
					output.appendLine("No environment found, using global python");
					command = "python";
				}

				let args = [
					"-m",
					"bokeh",
					"serve",
					dir,
					"--dev"
				];
				serverProcess = cp.spawn(command, args);

				serverProcess.stdout.on('data', (data) => {
					output.append(`${data}`);
				});
				
				serverProcess.stderr.on('data', (data) => {
					output.append(`${data}`);
				});
				
				serverProcess.on('close', (code) => {
					output.append(`child process exited with code ${code}`);
				});
			}
		}else{
			output.appendLine("Not a bokeh file");
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
	if (!_channel) {
		_channel = vscode.window.createOutputChannel('Bokeh');
	}
	return _channel;
}

function exec(command: string, options: cp.ExecOptions): Promise<{ stdout: string; stderr: string }> {
	return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
		cp.exec(command, options, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stdout, stderr });
			}
			resolve({ stdout, stderr });
		});
	});
}