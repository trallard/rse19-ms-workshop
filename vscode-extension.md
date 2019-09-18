# Building a VS Code Extension

VS Code is designed from the ground up to be easy to modify, augment and 
change. Almost every aspect of the editor is up for grabs, and indeed the
language support, debugging tools, syntax highlighting and everything else
that exists is implemented in the same framework that is exposed to
third party developers. In this tutorial, we will cover some of the basic
ways in which you can extend VS Code, but extensions are able to do so
much more:

- [Theming](https://code.visualstudio.com/api/extension-capabilities/theming): Change the look of VS Code with a color or icon theme
- [Extend the Workbench](https://code.visualstudio.com/api/extension-capabilities/extending-workbench): Add custom components & views in the UI
- [Custom Webviews](https://code.visualstudio.com/api/extension-guides/webview): Create a Webview to display a custom webpage built with HTML/CSS/JS
- [Languages](https://code.visualstudio.com/api/language-extensions/overview): Support a new programming language
- [Debugging](https://code.visualstudio.com/api/extension-guides/debugger-extension): Support debugging a specific runtime

There is much more to learn than can be covered in this short tutorial, so
if you are interested you should take a look at the resources available
at the [main VS Code documentation](https://code.visualstudio.com/api).
Much of this material is to be found in deeper detail there.

## Getting Started

Starting a new Extension project is straightforward. You will need to have
installed [Node.js](https://nodejs.org/en/) so you can run this command:

```
npm install -g yo generator-code
```

This will install [Yeoman](http://yeoman.io/) and [VS Code Extension Generator](https://www.npmjs.com/package/generator-code). You can use these to quickly set up a new Extension
project using an interactive command line tool:

```bash
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Which package manager to use? npm

code ./helloworld
```

If you use the prompts shown above, you will create a HelloWorld
extension project which we can modify to add further functionality.
The last line will open up VS Code in the extension directory.
As you might expect, VS Code is able to provide lots of useful
tools to help you create your extension.

## Creating a Command

The automatic tool has created a fully-functioning extension that
we can test. Either select "Debug->Start Debugging" or press
"F5", and VS Code will open up another instance of itself in
debug mode with your Extension code installed, allowing you to
step through your code in the main (host) instance while playing
with the extension in the (test) instance.

![First Extension Animation](assets/first_extension.gif)

The automatic project that has been created for you implements the
most straightforward kind of extension: a new command. The VS Code
command palette can be evoked by `CTRL+SHIFT+P` on Windows/Linux or
`SHIFT+⌘+P` on Mac, and brings up a list of commands supported by
VS Code for the current editor state. By implementing a custom
command extension, you can add a new command to this list. Let's look
at how we do that.

Extensions in VS Code are implemented in [Typescript](https://www.typescriptlang.org/),
a typed language which transpiles to Javascript. First, however,
we define in `project.json` what kind of extension we are building
and what it contributes to VS Code:

```javascript
{
  "name": "helloworld-sample",
  "displayName": "helloworld-sample",
  "description": "HelloWorld example for VS Code",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/Microsoft/vscode-extension-samples/helloworld-sample",
  "engines": {
    "vscode": "^1.34.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:extension.helloWorld"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "postinstall": "node ./node_modules/vscode/bin/install"
  },
  "devDependencies": {
    "@types/node": "^8.10.25",
    "@types/vscode": "^1.34.0",
    "tslint": "^5.16.0",
    "typescript": "^3.4.5"
  }
}
```

The file created by the tool should look something much like this. The most
important part of this file is the snippet below:

```javascript
  "activationEvents": ["onCommand:extension.helloWorld"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  },
```

We first indicate an [activation event](https://code.visualstudio.com/api/references/activation-events)
which tells VS Code when our code should be called. In this case, we want our
code called when the user selects our command. We then say where our extension
code lives (`./out/extension.js` is the executable code produced by our
typescript code). Finally, we tell VS Code what we our extension contributes,
which in this case is a new command. It has a unique name
(`extension.helloWorld`) but also a readable title, which will appear in the
command palette.

Now that we have told VS Code what our extension is and where to find
our code, we can provide our custom functionality. `src/extension.ts` contains
the automatically generated extension code we just ran:

```typescript
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```

The code in `activate` is called when the activation event we've specified
first fires. In this method, we register our new command by giving it a name 
(`extension.helloWorld`, matching the name we gave in `project.json`) and
providing a lambda function which will be called whenever the command is
triggered. In this case, we've popped up a quick information box saying
`Hello World!`. Let's change this to be `Hello VS Code!` and then reload
the extension:

![Animation of editing the extension code](assets/reload_extension.gif)

If you want, you can place a breakpoint in the function and debug your
extension directly. Your command can do any number of interesting
tasks, and has access to the state of the whole editor through
the rich [VS Code Extension API](https://code.visualstudio.com/api/references/vscode-api).

## Using Custom Output

While showing things as a popup message is one way of communicating, 
it is not a particularly effective way to provide helpful,
longer-term communication between our extension and the user.
One particularly useful functionality to which our Extension has access
is the ability to create custom output windows, which act like
read-only consoles that present information sequentially, allowing the
user to scroll back, click links, and copy and paste information.

We begin by adding the following code to `src/extension.ts`:

```typescript
// this method creates our own private output channel
let _channel: vscode.OutputChannel;
function getOutputChannel(): vscode.OutputChannel {
	if (!_channel) {
		_channel = vscode.window.createOutputChannel('Bokeh');
	}
	return _channel;
}
```

This code either returns our existing channel, or creates a new one
that will be shown in the Output drop down with the label "Bokeh".
Next, we can write to this output by appending lines. Try adding
the following code to your command callback:

```
```

Now, let's debug and run it:

![]()


## Child Processes

In the rest of this tutorial, we will focus on a particular extension
that we have developed for this repo. There are two [Bokeh](https://bokeh.pydata.org/en/latest/)
interactive websites that provide tools for exploring the [Iris](https://en.wikipedia.org/wiki/Iris_flower_data_set)
and [Boston](https://www.cs.toronto.edu/~delve/data/boston/bostonDetail.html)
datasets. While we can use the built-in terminal to start up the Bokeh server:

```bash
python -m bokeh serve iris
```

It would be very interesting if we could get a live preview of the
website as we develop it from inside of VS Code, similar to the Markdown
preview functionality (which is itself a default extension!). First, we
need a way of spawning a child process that will run the Bokeh
server for us. Thankfully, we have full access to Node's
[Child Process](https://nodejs.org/api/child_process.html) API. First
things first, we are going to rebrand our extension:

```javascript
  "activationEvents": ["onCommand:extension.bokehPreview"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.bokehPreview",
        "title": "Preview",
        "category": "Bokeh"
      }
    ]
  },
```

By adding a category, we allow VS Code to helpfully group any other
Bokeh related commands we may add later. In the UI, it will show up
as `Bokeh: Preview`:

![Bokeh Preview](assets/bokeh_preview.png)

Now we want our extension to spawn a child process that runs Bokeh.
To do this, we need to do a few things:

1. Find out what version of Python the user is running
2. Figure out if the current file is actually a Bokeh site
3. Check if an existing server process is already running
4. Spawn a new server




## Custom Menus

## WebView
