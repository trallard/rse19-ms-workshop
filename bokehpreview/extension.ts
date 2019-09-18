// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';

let previewPanel: vscode.WebviewPanel | undefined;
let serverProcess: cp.ChildProcess;
let bokehDir: string | undefined;

// this function is called when your extension is activated
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

		let dir = getBokehDir();
		if (dir) {
			startServer(dir);
		}

		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// we either create or reveal the preview panel
		if (previewPanel) {
			previewPanel.reveal(column);
		}
		else {
			// the preview panel lives as a tab in the editor
			previewPanel = vscode.window.createWebviewPanel(
				'bokehPreview',
				'Bokeh Preview',
				column || vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);

			// we can set its HTML directly
			previewPanel.webview.html = getWebviewContent();

			// when the user closes it, we clear our local reference
			previewPanel.onDidDispose(() => {
				previewPanel = undefined;
			},
				null,
				context.subscriptions);
		}
	});

	context.subscriptions.push(disposable);
}

function getBokehDir(): string | undefined {
	let output = getOutputChannel();
	let activeEditor = vscode.window.activeTextEditor;
	output.appendLine("Examining file...");
	if (!activeEditor) {
		output.appendLine("No active editor");
		return undefined;
	}

	// now we get the active document and see if it is named "main.py"
	let doc = activeEditor.document;
	let start = doc.fileName.length - "main.py".length;
	if (doc.fileName.substring(start) === "main.py") {
		// finally we look for certain lines which are highly correlated
		// with Bokeh usage
		output.appendLine("main.py detected");
		let text = doc.getText();
		let import_bokeh = text.indexOf("from bokeh.io import curdoc") >= 0;
		let add_root = text.indexOf("curdoc().add_root(") >= 0;
		let dir = doc.fileName.substring(0, start);
		if (import_bokeh && add_root) {
			// fairly certain this is a Bokeh server file so we try to
			// start the server
			return dir;
		} else {
			output.appendLine("Unable to find bokeh invocations in file");
			return undefined;
		}
	}

	output.appendLine("Not a bokeh file");
	return undefined;
}

// this function sets the Bokeh directory and tries to start a new server.
// if the existing server is running, it kills it.
function startServer(dir: string) {
	let output = getOutputChannel();
	output.appendLine("Starting server...");
	bokehDir = dir;
	if (serverProcess) {
		serverProcess.kill();
		return;
	}

	spawnServer();
}

// this function spawns a new Bokeh server child process
function spawnServer() {
	if (!bokehDir) {
		// no directory has been set, so new need for a server
		return;
	}

	let output = getOutputChannel();
	let python = getPython();
	let args = [
		"-m",
		"bokeh",
		"serve",
		bokehDir,
		"--dev"
	];

	// this partially protects us from starting two servers at the same time
	bokehDir = undefined;

	// this creates a new independent child process that runs the server
	serverProcess = cp.spawn(python, args);

	// we can use this to hook up to stdout/stderr of the process
	// and output them to our custom channel
	serverProcess.stdout.on('data', (data) => {
		output.append(`${data}`);
	});

	serverProcess.stderr.on('data', (data) => {
		output.append(`${data}`);
	});

	serverProcess.on('close', (code) => {
		output.append(`child process exited with code ${code}`);
		// if we killed an old server, then we want to start a new one
		if (bokehDir) {
			spawnServer();
		}
	});
}

// We use a simple iframe to host the page produced by the Bokeh server.
function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Bokeh Preview</title>
  </head>
  <body>
  	<iframe src="http://localhost:5006/" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
		Your browser doesn't support iframes
	</iframe>
  </body>
  </html>`;
}

// In this function, we attempt to find the configured python environment, if it exists.
function getPython(): string {
	let output = getOutputChannel();
	let pythonConf = vscode.workspace.getConfiguration("python");
	if (!pythonConf) {
		output.appendLine("Python not configured, assuming global python");
		return "python";
	}

	let env = pythonConf.get<string>("pythonPath");
	if (!env) {
		output.appendLine("No environment found, assuming global python");
		return "python";
	}

	output.appendLine("Using " + env);
	return env;
}

// this function is called when your extension is deactivated
export function deactivate() {
	if (serverProcess) {
		serverProcess.kill();
	}
}

// this function creates our own private output channel
let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
	if (!_channel) {
		_channel = vscode.window.createOutputChannel('Bokeh');
	}
	return _channel;
}